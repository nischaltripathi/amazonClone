import React from 'react';
import {motion} from 'framer-motion';
import './Product.css';
import { useStateValue } from './StateProvider';
import { NotificationManager} from 'react-notifications';

function Product({ id,title, image, price, rating }) {
    const [{basket}, dispatch] = useStateValue();

    const addToBasket = () => {
        NotificationManager.success('Added to your cart', `${title}`);
       dispatch({
           type: 'ADD_TO_BASKET',
           item:{
               id:id,
               title: title,
               image:image,
               price: price,
               rating: rating,
           },
       });
        
    };
    return (
        <motion.div className="product"
        initial={{
          opacity: 0,
          y: 200
         }}
        animate={{
          opacity: 1,
          y: 0,
          transition: {duration: 0.5}
        }}
        whileHover={{
          scale: 0.9,
          transition: { duration: 0.2 },
        }}
     > 
       
           <div className="product__info">
           <p>{title}</p>
           <p className="product__price">
               <small>$</small>
               <strong>{price}</strong>
           </p>
           <div className="product__rating">
               {Array(rating)
               .fill()
               .map((_, i) =>(
               <p>🌟</p>
               ))}
               
           </div>
           </div>
           <img src={image} alt=""/>
           <button onClick={addToBasket}>Add to Basket</button>
       
        </motion.div>
    );
}

export default Product;
