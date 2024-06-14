// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const token = localStorage.getItem('token');
    const user = token ? JSON.parse(atob(token.split('.')[1])).user : null;

    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/events">Events</Link></li>
                {user && user.role === 'admin' && <li><Link to="/dashboard">Dashboard</Link></li>}
                {user && <li><Link to="/reservations">Reservations</Link></li>}
                {!user ? (
                    <>
                        <li><Link to="/register">Register</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </>
                ) : (
                    <li><Link to="/" onClick={() => {
                        localStorage.removeItem('token');
                        window.location.href = '/';
                    }}>Logout</Link></li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
