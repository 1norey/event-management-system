// src/pages/Events.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Events = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/events');
                setEvents(res.data.events);
            } catch (err) {
                console.error('Error fetching events:', err);
                toast.error('Error fetching events');
            }
        };

        fetchEvents();
    }, []);

    const reserveEvent = async (eventId) => {
        try {
            // Get the token from localStorage
            const token = localStorage.getItem('token');
            
            // If token is not found, handle the error appropriately
            if (!token) {
                toast.error('User is not authenticated');
                return;
            }
            
            // Set up the axios configuration with headers
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            };
    
            // Make the request to reserve the event
            await axios.post('http://localhost:5000/api/events/reserve', { eventId }, config);
            console.log(token);
            // Display success message
            toast.success('Event reserved successfully');
        } catch (err) {
            console.error('Error reserving event:', err);
            
            // Display error message
            toast.error('Error reserving event');
        }
    };

    return (
        <div className="events-container">
            <h1 className="page-title">Events</h1>
            <div className="events-grid">
                {events.map(event => (
                    <div key={event._id} className="event-card">
                        <h2>{event.title}</h2>
                        <p>{event.description}</p>
                        <p>{new Date(event.date).toLocaleDateString()}</p>
                        <p>{event.location}</p>
                        <button onClick={() => reserveEvent(event._id)} className="reserve-btn">Reserve</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Events;
