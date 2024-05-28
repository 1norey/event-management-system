import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await axios.get('http://localhost:5000/api/auth/users');
            setUsers(res.data);
        };

        const fetchEvents = async () => {
            const res = await axios.get('http://localhost:5000/api/events');
            setEvents(res.data);
        };

        fetchUsers();
        fetchEvents();
    }, []);

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <h2>Users</h2>
            <ul>
                {users.map(user => (
                    <li key={user._id}>{user.name} - {user.email}</li>
                ))}
            </ul>
            <h2>Events</h2>
            <ul>
                {events.map(event => (
                    <li key={event._id}>{event.title} - {event.date}</li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
