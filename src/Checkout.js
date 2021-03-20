import { SubdirectoryArrowLeftTwoTone } from '@material-ui/icons';
import React, { useEffect } from 'react';
import './Checkout.css';
import { useHistory } from 'react-router-dom';
import Adbanner from './images/adbanner.png';
import Subtotal from './Subtotal';
import { useStateValue } from './StateProvider';
import { auth } from './firebase';
import CheckoutProduct from './CheckoutProduct';

function Checkout() {
    const history = useHistory();
    const [{basket, user}, dispatch] = useStateValue();
    return (
        <div className="checkout">
            <div className="checkout__left">
                <img className="checkout__ad" src={Adbanner} alt=""/>
                <div>
                    <h3>Hello, {user?.email}</h3>
                    <h2 className="checkout__title">
                      Your Shopping Basket

                      {basket.map(item =>(
                          <CheckoutProduct
                             id={item.id}
                             title={item.title}
                             image={item.image}
                             price={item.price}
                             rating={item.rating}

                           />
                        
                        ))}
                      {/* CheckOutProduct */}
                      {/* CheckOutProduct */}
                      {/* Basketitem */}
                    </h2>
                </div>
            </div>
            <div className="checkout__right">
                <Subtotal />
            </div>
        </div>
    );
}

export default Checkout;
