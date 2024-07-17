
import React from 'react';
import { Link } from 'react-router-dom';
import "./App.css"

const LandingPage = () => {
    return (
        <div className='landing-page'>
            <h1 id='welcome'>Welcome to Home Haven</h1>
            <Link to="/register" className='link'>Sign Up</Link>
            <br />
            <Link to="/login" className='link'>Login</Link>
        </div>
    );
};

export default LandingPage;