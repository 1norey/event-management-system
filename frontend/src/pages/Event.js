// src/pages/Event.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Event = ({ match }) => {
    const [event, setEvent] = useState({});

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const res = await axios.get(`/api/events/${match.params.id}`);
                setEvent(res.data.event);
            } catch (err) {
                console.error('Error fetching event:', err);
            }
        };

        fetchEvent();
    }, [match.params.id]);

    const reserveEvent = async (eventId) => {
        try {
            await axios.post('/api/events/reserve', { eventId });
            console.log('Event reserved successfully');
        } catch (err) {
            console.error('Error reserving event:', err);
        }
    };

    return (
        <div>
            <h1>{event.title}</h1>
            <p>{event.description}</p>
            <p>{event.date}</p>
            <p>{event.location}</p>
            <button onClick={() => reserveEvent(event._id)}>Reserve</button>
        </div>
    );
};

export default Event;
