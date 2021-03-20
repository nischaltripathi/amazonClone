import React, {useState} from 'react';
import './Login.css';
import logo from './images/amazonloginlogo.png';
import {Link, useHistory} from 'react-router-dom';
import {auth} from './firebase';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const signin = (e) => {
        e.preventDefault()
        
        auth
        .signInWithEmailAndPassword(email, password)
        .then(auth => {
            history.push('/')
        })
        .catch(error => alert(error.message))
    }

    const register = (e) => {
        e.preventDefault()

        auth
           .createUserWithEmailAndPassword(email, password)
           .then((auth) => {
               console.log(auth);
               if(auth){
                   history.push('/')
               }
           })
           .catch(error=>alert(error.message))

        //some fancy firebase
    }
    return (
        <div className="login">
            <Link to="/">
            <img className="login__logo" src={logo} />
            </Link>

            <div className="login__container">
                <h1> Sign-in </h1>

                <form>
                    <h5>E-mail</h5>
                    <input type="email" value={email} onChange={ e=> setEmail(e.target.value)}/>

                    <h5>Password</h5>
                    <input type="password" value={password} onChange={ e=> setPassword(e.target.value)}/>
                    
                    <button type="submit" onClick={signin} className="login__signInButton">
                        Sign In
                    </button>
                </form>
                <p>
                 By continuing, you agree to Amazon Clone's Conditions of Use and Privacy Notice.
                </p>

            <button onClick={register} className="login__registerButton">
                Create Aour Amazon Account
            </button>
            </div>
      
        </div>
    );
}

export default Login;
