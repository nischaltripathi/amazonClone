import React, { useEffect } from 'react';
import './App.css';
import Header from './Header';
import Home from './Home';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Checkout from './Checkout';
import Login from './Login';
import ProductInside from './ProductInside';
import {motion} from 'framer-motion';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import Payment from './Payment';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import Orders from './Orders';

const promise = loadStripe('pk_test_51IThpMCc0QmKoy51amcV9JQq7JliHVJ8qUPHeVEMtX7iZPSg4GK8ZmbosAV5fZUvSfssY0lKtv2MtpFSLoU7QJAT00zmtEsEik');


function App() {
  const [state, dispatch] = useStateValue();
  useEffect(() => {
     auth.onAuthStateChanged(authUser => {
       console.log('The USER is >>>>>', authUser);

       if(authUser){
           dispatch({
             type: 'SET_USER',
             user:authUser,
           })
       } 
       else{
        dispatch({
        type: 'SET_USER',
        user: null,
        })
       }
     })
  }, [])
   
  return (
    <Router>
    <motion.div>  
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/orders">
            <Header />
            <Orders />
          </Route>
          <Route path="/productinside">
            <Header />
            <ProductInside />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/checkout">
            <Header />
             <Checkout />
         </Route>
         <Route path="/">
           <Header />
           <Home />
         </Route>
        </Switch>
    </motion.div>
    </Router>
  );
}

export default App;
