import React, { useState, useEffect } from 'react';
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
import { Link, useHistory } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';
import { useElements, useStripe, CardElement } from '@stripe/react-stripe-js';
import './Payment.css';
import {getBasketTotal} from './reducer.js';
import axios from './axios';
import {db} from './firebase';

function Payment() {
    const [{basket, user}, dispatch] = useStateValue();
         const history = useHistory();
         
        const stripe = useStripe();
        const elements = useElements();

        const [error, setError] = useState(null);
        const [disabled, setDisabled] = useState(true);
        const [processing, setProcessing] = useState('');
        const [succeeded, setSucceeded] = useState(false);
        const [clientSecret, setClientSecret] = useState(true);

        useEffect(() => {
           //generate the special stripe secret which allows us to charge customer

           const getClientSecret = async () => {
              const response = await axios({
                  method: 'post',
                  //stripes expects the total in a currencies subunits
                  url: `/payments/create?total=${getBasketTotal(basket)*100 }`
              });
              setClientSecret(response.data.clientSecret)
           }
            getClientSecret();
        }, [basket])
       
        const handleSubmit = async (event) => {
           event.preventDefault();
           setProcessing(true);

           const payload = await stripe.confirmCardPayment(clientSecret, {
               payment_method:{
                   card:elements.getElement(CardElement)
               }
           }).then(({paymentIntent})=> {

            db
            .collection('users')
            .doc(user?.uid)
            .collection('orders')
            .doc(paymentIntent.id)
            .set({
                basket: basket,
                amount: paymentIntent.amount,
                created: paymentIntent.created
            })

                
            setSucceeded(true);
            setError(null);
            setProcessing(false);

            dispatch ({
                type: 'EMPTY_BASKET'
            })

            history.replace('/orders')
           })
        }

        const handleChange = (event) =>{
            setDisabled(event.empty);
            setError(event.error ? event.error.message : "");
        }
    return (
        <div className="payment">
                <div className="payment__container">
                    <h1>
                        Checkout(
                            <Link to="/checkout">
                                {basket?.length} items
                            </Link>
                        )
                    </h1>
                      <div className="payment__section">
                      <div className="payment__title">
                          <h3>Delivery Address</h3>
                      </div>
                      <div className="payment__address">
                          <p>{user?.email}</p>
                          <p>456 Grand Junction Road</p>
                          <p>ClearView, South Australia</p>
                      </div>
                     </div>
                     <div className="payment__section">
                        <div className="payment__title">
                            <h3>Review items and Delivery</h3>
                        </div>
                        <div className="payment__items">
                            {basket.map(item=> (
                                <CheckoutProduct 
                                  id={item.id}
                                  title={item.title}
                                  image={item.image}
                                  price={item.price}
                                  rating={item.rating}
                                />
                            ))}
                        </div>
                     </div>
                     <div className="payment__section">
                        <div className="payment__title">
                            <h3>Payment Method</h3>
                        </div>
                        <div className="payment__details">
                             <form onSubmit={handleSubmit}>
                                 <CardElement onChange={handleChange}/>
                                 <div className="payment__priceContainer">
                                 <CurrencyFormat         
                                   renderText={(value) => (
                                  <>
                                  <h3>
                                    Order Total({basket.length}):
                                    <strong> {value} </strong>
                                 </h3>
                                 <small className="subtotal__gift">
                                  <input type="checkbox" /> 
                                    This order contains a gift
                                 </small>
                                 </>   
                                  )}
                                  decimalScale={2}
                                 value={getBasketTotal(basket)}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  prefix={"$"}
                                  />

                                      <button disabled={processing || disabled || succeeded}>
                                        <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                      </button>
                                 </div>
                                 {error && <div>{error}</div>}
                             </form>
                        </div>
                        </div>
                        
                 </div>
            </div>
    );
}

export  default Payment;
