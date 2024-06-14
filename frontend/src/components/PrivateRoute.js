// PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const token = localStorage.getItem('token');
    const user = token ? JSON.parse(atob(token.split('.')[1])).user : null;

    if (!token || (user && user.role !== 'admin')) {
        return <Navigate to="/" />;
    }

    return <Component {...rest} />;
};

export default PrivateRoute;
