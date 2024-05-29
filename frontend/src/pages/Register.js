import React, { useState } from 'react';
import axios from 'axios';
import './register.css';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        dateOfBirth: '',
        age: '',
        email: '',
        password: ''
    });

    const { name, surname, dateOfBirth, age, email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();

        const newUser = {
            name,
            surname,
            dateOfBirth,
            age,
            email,
            password
        };

        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', newUser);
            console.log(res.data);
        } catch (err) {
            console.error(err.response.data);
        }
    };

    return (
        <div className="register-container">
            <h1 className="register-header">Register</h1>
            <form className="register-form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        value={name}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Surname"
                        name="surname"
                        value={surname}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="date"
                        placeholder="Date of Birth"
                        name="dateOfBirth"
                        value={dateOfBirth}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="number"
                        placeholder="Age"
                        name="age"
                        value={age}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={email}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={e => onChange(e)}
                    />
                </div>
                <input type="submit" value="Register" className="btn" />
            </form>
        </div>
    );
};

export default Register;
