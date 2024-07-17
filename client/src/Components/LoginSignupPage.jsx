import React, { useState } from 'react';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import './LoginSignup.css';

const LoginSignupPage = () => {
    const [isSigningUp, setIsSigningUp] = useState(true);

    return (
        <div className='background' >
        
            <div className="LoginSignup-page">
                <div className="LoginSignup-toggle-buttons">
                    <button 
                        onClick={() => setIsSigningUp(true)} 
                        aria-pressed={isSigningUp}
                    >
                        Sign Up
                    </button>
                    <button 
                        onClick={() => setIsSigningUp(false)} 
                        aria-pressed={!isSigningUp}
                    >
                        Log In
                    </button>
                </div>
                {isSigningUp ? <RegisterForm /> : <LoginForm />}
            </div>
        </div>
    );
}

export default LoginSignupPage;
