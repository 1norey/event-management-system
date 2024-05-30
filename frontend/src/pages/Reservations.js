// src/pages/Reservations.js

import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';
import './reservations.css';
import { toast } from 'react-toastify';

const Reservations = () => {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const res = await axios.get('/reservations');
                setReservations(res.data);
            } catch (err) {
                toast.error('Error fetching reservations');
            }
        };

        fetchReservations();
    }, []);

    return (
        <div className="reservations-container">
            <h1 className="page-title">Your Reservations</h1>
            <div className="reservations-grid">
                {reservations.map(reservation => (
                    <div key={reservation._id} className="reservation-card">
                        <h2>{reservation.event.title}</h2>
                        <p>{reservation.event.description}</p>
                        <p>{new Date(reservation.event.date).toLocaleDateString()}</p>
                        <p>{reservation.event.location}</p>
                        <p>You reserved this event on {new Date(reservation.registeredAt).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Reservations;
