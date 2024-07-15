import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';

const HomePage = () => {
    return (
        <div>
            <h1>Home Page</h1>
            <LogoutButton />
            <br />
            <Link to="/bookings">Go to Booking Page</Link>
            <br />
            <Link to="/rooms">View and Review Rooms</Link>
            <br />
            <Link to="/about">About Our Hotel</Link> 
        </div>
    );
};

export default HomePage;
