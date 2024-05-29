import React, { useEffect, useState } from 'react';
import axios from 'axios';


const Event = ({ match }) => {
    const [event, setEvent] = useState({});

    useEffect(() => {
        const fetchEvent = async () => {
            const res = await axios.get(`http://localhost:5000/api/events/${match.params.id}`);
            setEvent(res.data);
        };

        fetchEvent();
    }, [match.params.id]);

    return (
        <div>
            <h1>{event.title}</h1>
            <p>{event.description}</p>
            <p>{event.date}</p>
            <p>{event.location}</p>
        </div>
    );
};

export default Event;
