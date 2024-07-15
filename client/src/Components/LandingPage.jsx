
import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div>
            <h1>Welcome to Home Haven</h1>
            <Link to="/register">Sign Up</Link>
            <br />
            <Link to="/login">Login</Link>
        </div>
    );
};

export default LandingPage;