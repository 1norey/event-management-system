import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import './dashboard.css';

Modal.setAppElement('#root');

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [events, setEvents] = useState([]);
    const [newUser, setNewUser] = useState({ name: '', email: '' });
    const [newEvent, setNewEvent] = useState({ title: '', date: '', description: '' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState({ _id: '', name: '', email: '' });
    const [currentEvent, setCurrentEvent] = useState({ _id: '', title: '', date: '' });  // Declare currentEvent state
    const [isEventModalOpen, setIsEventModalOpen] = useState(false);  // Declare isEventModalOpen state

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
            setEvents(res.data.events);
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
            closeModal();
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
            setNewEvent({ title: '', date: '', description: '' }); // Clear fields after successful submission
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
            closeEventModal();
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

    const openModal = async (id) => {
        try {
            console.log('Fetching user data for ID:', id);
            const res = await axios.get(`http://localhost:5000/api/auth/user/${id}`);
            setCurrentUser(res.data);
            setIsModalOpen(true);
            console.log('Modal opened');
        } catch (error) {
            toast.error('Error fetching user data');
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentUser({ _id: '', name: '', email: '' });
    };

    const openEventModal = async (id) => {
        try {
            console.log('Fetching event data for ID:', id);
            const res = await axios.get(`http://localhost:5000/api/events/${id}`);
            setCurrentEvent(res.data);
            setIsEventModalOpen(true);
            console.log('Event Modal opened');
        } catch (error) {
            toast.error('Error fetching event data');
        }
    };

    const closeEventModal = () => {
        setIsEventModalOpen(false);
        setCurrentEvent({ _id: '', title: '', date: '' });
    };

    const handleModalChange = (e) => {
        const { name, value } = e.target;
        setCurrentUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleEventModalChange = (e) => {
        const { name, value } = e.target;
        setCurrentEvent(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div className="dashboard-content">
            <h1>Admin Dashboard</h1>
            <div className="table-container">
                <h2>Users</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    <button onClick={() => openModal(user._id)}>Update</button>
                                    <button onClick={() => deleteUser(user._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="table-container">
                <h2>Events</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map(event => (
                            <tr key={event._id}>
                                <td>{event.title}</td>
                                <td>{event.date}</td>
                                <td>
                                    <button onClick={() => openEventModal(event._id)}>Update</button>
                                    <button onClick={() => deleteEvent(event._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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
                <input
                    type="text"
                    placeholder="Description"
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                />
                <button onClick={addEvent}>Add Event</button>

            </div>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Update User"
                className="Modal"
                overlayClassName="Overlay"
            >
                <h2>Update User</h2>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={currentUser.name}
                    onChange={handleModalChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={currentUser.email}
                    onChange={handleModalChange}
                />
                <button onClick={() => updateUser(currentUser._id, currentUser)}>Update</button>
                <button onClick={closeModal}>Close</button>
            </Modal>

            <Modal
                isOpen={isEventModalOpen}
                onRequestClose={closeEventModal}
                contentLabel="Update Event"
                className="Modal"
                overlayClassName="Overlay"
            >
                <h2>Update Event</h2>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={currentEvent.title}
                    onChange={handleEventModalChange}
                />
                <input
                    type="date"
                    name="date"
                    value={currentEvent.date}
                    onChange={handleEventModalChange}
                />
                <button onClick={() => updateEvent(currentEvent._id, currentEvent)}>Update</button>
                <button onClick={closeEventModal}>Close</button>
            </Modal>
        </div>
    );
};

export default Dashboard;
