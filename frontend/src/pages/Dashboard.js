import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './dashboard.css';

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [events, setEvents] = useState([]);
    const [newUser, setNewUser] = useState({ name: '', email: '' });
    const [newEvent, setNewEvent] = useState({ title: '', date: '' });

    const fetchUsers = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/auth/user');
            setUsers(res.data);
        } catch (error) {
            toast.error('Error fetching users');
        }
    };

    const fetchEvents = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/events');
            setEvents(res.data);
        } catch (error) {
            toast.error('Error fetching events');
        }
    };

    useEffect(() => {
        fetchUsers();
        fetchEvents();
    }, []);

    const addUser = async () => {
        try {
            const res = await axios.post('http://localhost:5000/api/auth/user', newUser);
            setUsers([...users, res.data]);
            setNewUser({ name: '', email: '' });
            toast.success('User added successfully');
        } catch (error) {
            toast.error('Error adding user');
        }
    };

    const updateUser = async (id, updatedUser) => {
        try {
            const res = await axios.put(`http://localhost:5000/api/auth/user/${id}`, updatedUser);
            setUsers(users.map(user => (user._id === id ? res.data : user)));
            toast.success('User updated successfully');
        } catch (error) {
            toast.error('Error updating user');
        }
    };

    const deleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/auth/user/${id}`);
            setUsers(users.filter(user => user._id !== id));
            toast.success('User deleted successfully');
        } catch (error) {
            toast.error('Error deleting user');
        }
    };

    const addEvent = async () => {
        try {
            const res = await axios.post('http://localhost:5000/api/events', newEvent);
            setEvents([...events, res.data]);
            setNewEvent({ title: '', date: '' });
            toast.success('Event added successfully');
        } catch (error) {
            toast.error('Error adding event');
        }
    };

    const updateEvent = async (id, updatedEvent) => {
        try {
            const res = await axios.put(`http://localhost:5000/api/events/${id}`, updatedEvent);
            setEvents(events.map(event => (event._id === id ? res.data : event)));
            toast.success('Event updated successfully');
        } catch (error) {
            toast.error('Error updating event');
        }
    };

    const deleteEvent = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/events/${id}`);
            setEvents(events.filter(event => event._id !== id));
            toast.success('Event deleted successfully');
        } catch (error) {
            toast.error('Error deleting event');
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
