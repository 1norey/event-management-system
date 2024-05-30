// src/pages/Events.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Events = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await axios.get('/api/events');
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
            await axios.post('/api/events/reserve', { eventId });
            toast.success('Event reserved successfully');
        } catch (err) {
            console.error('Error reserving event:', err);
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
