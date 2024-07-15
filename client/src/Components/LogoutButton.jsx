
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        const response = await fetch('http://127.0.0.1:5555/users/logout', {
            method: 'POST',
        });
        const data = await response.json();
        console.log(data);
        if (response.ok) {
            navigate('/');
        }
    };

    return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
