import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './dashboard.css';

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [events, setEvents] = useState([]);
    const [newUser, setNewUser] = useState({ name: '', email: '' });
    const [newEvent, setNewEvent] = useState({ title: '', date: '' });

    // JWT token
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY1NzFiMWU0NzRkYzcwOWZjMDkyMTU4Iiwicm9sZSI6InVzZXIifSwiaWF0IjoxNzE2OTg0NjA3LCJleHAiOjE3MTY5ODgyMDd9.8taOea6L25XdKrcolGdhVH7pRlb1jKSJwZfEgKdImlc";

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/auth/user', {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                setUsers(res.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        const fetchEvents = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/events', {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                setEvents(res.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchUsers();
        fetchEvents();
    }, []);

    const addUser = async () => {
        try {
            const res = await axios.post('http://localhost:5000/api/auth/user', newUser, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            setUsers([...users, res.data]);
            setNewUser({ name: '', email: '' });
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    const updateUser = async (id, updatedUser) => {
        try {
            const res = await axios.put(`http://localhost:5000/api/auth/user/${id}`, updatedUser, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            setUsers(users.map(user => (user._id === id ? res.data : user)));
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.error('User not found:', error);
            } else {
                console.error('Error updating user:', error);
            }
        }
    };

    const deleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/auth/user/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setUsers(users.filter(user => user._id !== id));
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.error('User not found:', error);
            } else {
                console.error('Error deleting user:', error);
            }
        }
    };

    const addEvent = async () => {
        try {
            const res = await axios.post('http://localhost:5000/api/events', newEvent, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            setEvents([...events, res.data]);
            setNewEvent({ title: '', date: '' });
        } catch (error) {
            console.error('Error adding event:', error);
        }
    };

    const updateEvent = async (id, updatedEvent) => {
        try {
            const res = await axios.put(`http://localhost:5000/api/events/${id}`, updatedEvent, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            setEvents(events.map(event => (event._id === id ? res.data : event)));
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.error('Event not found:', error);
            } else {
                console.error('Error updating event:', error);
            }
        }
    };

    const deleteEvent = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/events/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setEvents(events.filter(event => event._id !== id));
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.error('Event not found:', error);
            } else {
                console.error('Error deleting event:', error);
            }
        }
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <h2>Users</h2>
            <ul>
                {users.map(user => (
                    <li key={user._id}>
                        {user.name} - {user.email}
                        <button onClick={() => updateUser(user._id, { ...user, name: 'Updated Name' })}>Update</button>
                        <button onClick={() => deleteUser(user._id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <h2>Add User</h2>
            <input
                type="text"
                placeholder="Name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
            <input
                type="email"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
            <button onClick={addUser}>Add User</button>

            <h2>Events</h2>
            <ul>
                {events.map(event => (
                    <li key={event._id}>
                        {event.title} - {event.date}
                        <button onClick={() => updateEvent(event._id, { ...event, title: 'Updated Title' })}>Update</button>
                        <button onClick={() => deleteEvent(event._id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <h2>Add Event</h2>
            <input
                type="text"
                placeholder="Title"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            />
            <input
                type="date"
                value={newEvent.date}
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
            />
            <button onClick={addEvent}>Add Event</button>
        </div>
    );
};

export default Dashboard;
