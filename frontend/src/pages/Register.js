import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Ensure this is correctly imported
import './register.css';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        age: '',
        dateOfBirth: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const { name, surname, age, dateOfBirth, email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();

        const newUser = {
            name,
            surname,
            age,
            dateOfBirth,
            email,
            password
        };

        try {
            await axios.post('http://localhost:5000/api/auth/register', newUser);
            toast.success('Registration successful!');
            navigate('/login');
        } catch (err) {
            if (err.response && err.response.data && err.response.data.msg) {
                toast.error(err.response.data.msg);
            } else {
                toast.error('An error occurred while registering. Please try again later.');
            }
        }
    };

    return (
        <div className="register-container">
            <h1 className="register-header">Register</h1>
            <form className="register-form" onSubmit={onSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        value={name}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Surname"
                        name="surname"
                        value={surname}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="number"
                        placeholder="Age"
                        name="age"
                        value={age}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="date"
                        placeholder="Date of Birth"
                        name="dateOfBirth"
                        value={dateOfBirth}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={email}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={onChange}
                    />
                </div>
                <input type="submit" value="Register" className="btn" />
            </form>
        </div>
    );
};

export default Register;
