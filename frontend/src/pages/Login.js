import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


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
            console.log(res);
            localStorage.setItem('token', res.data.token);

            // Redirect to homepage
            navigate('/');
        } catch (err) {
            setError(err.response.data.message);
            console.error(err);
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={onSubmit}>
                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={email}
                        onChange={onChange}
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        required
                    />
                </div>
                {error && <p>{error}</p>}
                <input type="submit" value="Login" />
            </form>
        </div>
    );
};

export default Login;
