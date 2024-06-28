import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const token = localStorage.getItem('token');
    const user = token ? JSON.parse(atob(token.split('.')[1])).user : null;
    const role = localStorage.getItem("role");

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        window.location.href = '/';
    };

    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/events">Events</Link></li>
                {role === 'admin' && <li><Link to="/dashboard">Dashboard</Link></li>}
                {user && <li><Link to="/reservations">Reservations</Link></li>}
                {!role ? (
                    <>
                        <li><Link to="/register">Register</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </>
                ) : (
                    <li><Link to="/" onClick={handleLogout}>Logout</Link></li>
                )}
                
                <li><Link to="/our-team">Our Team</Link></li> 
            </ul>
        </nav>
    );
};

export default Navbar;