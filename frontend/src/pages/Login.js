import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css';  // Import the CSS file

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();

        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password
            });

            // Store token in local storage
            localStorage.setItem('token', res.data.token);
            if (res.data.role === "admin") {
                navigate('/dashboard');
            } else {
                navigate('/');
            }
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    return (
        <div className="login-container">
            <h1 className="login-header">Login</h1>
            <form className="login-form" onSubmit={onSubmit}>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={email}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        required
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                <input className="btn" type="submit" value="Login" />
            </form>
        </div>
    );
};

export default Login;
