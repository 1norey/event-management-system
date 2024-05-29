import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './events.css';

const Events = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            const res = await axios.get('http://localhost:5000/api/events');
            setEvents(res.data);
        };

        fetchEvents();
    }, []);

    return (
        <div>
            <h1>Events</h1>
            <ul>
                {events.map(event => (
                    <li key={event._id}>
                        <Link to={`/events/${event._id}`}>{event.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Events;
