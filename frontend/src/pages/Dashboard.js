import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import './dashboard.css';

Modal.setAppElement('#root');

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [events, setEvents] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [newEvent, setNewEvent] = useState({ title: '', date: '', description: '' });
    const [newContact, setNewContact] = useState({ email: '', name: '', message: '' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState({ _id: '', name: '', email: '' });
    const [currentEvent, setCurrentEvent] = useState({ _id: '', title: '', date: '', description: '' });
    const [currentContact, setCurrentContact] = useState({ _id: '', email: '', name: '', message: '' });
    const [isEventModalOpen, setIsEventModalOpen] = useState(false);
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);

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

    const fetchContacts = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/contacts');
            setContacts(res.data);
        } catch (error) {
            toast.error('Error fetching contacts');
        }
    };

    useEffect(() => {
        fetchUsers();
        fetchEvents();
        fetchContacts();
    }, []);

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
            setNewEvent({ title: '', date: '', description: '' });
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

    const addContact = async () => {
        try {
            const res = await axios.post('http://localhost:5000/api/contacts', newContact);
            setContacts([...contacts, res.data]);
            setNewContact({ email: '', name: '', message: '' });
            toast.success('Contact added successfully');
        } catch (error) {
            toast.error('Error adding contact');
        }
    };

    const updateContact = async (id, updatedContact) => {
        try {
            const res = await axios.put(`http://localhost:5000/api/contacts/${id}`, updatedContact);
            setContacts(contacts.map(contact => (contact._id === id ? res.data : contact)));
            toast.success('Contact updated successfully');
            closeContactModal();
        } catch (error) {
            toast.error('Error updating contact');
        }
    };

    const deleteContact = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/contacts/${id}`);
            setContacts(contacts.filter(contact => contact._id !== id));
            toast.success('Contact deleted successfully');
        } catch (error) {
            toast.error('Error deleting contact');
        }
    };

    const openModal = async (id) => {
        try {
            const res = await axios.get(`http://localhost:5000/api/auth/user/${id}`);
            setCurrentUser(res.data);
            setIsModalOpen(true);
        } catch (error) {
            toast.error('Error fetching user data');
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentUser({ _id: '', name: '', email: '' });
    };

    const handleModalChange = (e) => {
        setCurrentUser({ ...currentUser, [e.target.name]: e.target.value });
    };

    const openEventModal = async (id) => {
        try {
            const res = await axios.get(`http://localhost:5000/api/events/${id}`);
            setCurrentEvent(res.data);
            setIsEventModalOpen(true);
        } catch (error) {
            toast.error('Error fetching event data');
        }
    };

    const closeEventModal = () => {
        setIsEventModalOpen(false);
        setCurrentEvent({ _id: '', title: '', date: '', description: '' });
    };

    const handleEventModalChange = (e) => {
        setCurrentEvent({ ...currentEvent, [e.target.name]: e.target.value });
    };

    const openContactModal = async (id) => {
        try {
            const res = await axios.get(`http://localhost:5000/api/contacts/${id}`);
            setCurrentContact(res.data);
            setIsContactModalOpen(true);
        } catch (error) {
            toast.error('Error fetching contact data');
        }
    };

    const closeContactModal = () => {
        setIsContactModalOpen(false);
        setCurrentContact({ _id: '', email: '', name: '', message: '' });
    };

    const handleContactModalChange = (e) => {
        setCurrentContact({ ...currentContact, [e.target.name]: e.target.value });
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
                <div className="form-group">
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
                </div>
                <button onClick={addEvent}>Add Event</button>
            </div>

            <div className="table-container">
                <h2>Contacts</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Name</th>
                            <th>Message</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map(contact => (
                            <tr key={contact._id}>
                                <td>{contact.email}</td>
                                <td>{contact.name}</td>
                                <td>{contact.message}</td>
                                <td>
                                    <button onClick={() => openContactModal(contact._id)}>Update</button>
                                    <button onClick={() => deleteContact(contact._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <h2>Add Contact</h2>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email"
                        value={newContact.email}
                        onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Name"
                        value={newContact.name}
                        onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                    />
                    <textarea
                        placeholder="Message"
                        value={newContact.message}
                        onChange={(e) => setNewContact({ ...newContact, message: e.target.value })}
                    />
                </div>
                <button onClick={addContact}>Add Contact</button>
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
                <div className="button-group">
                    <button onClick={() => updateUser(currentUser._id, currentUser)}>Update</button>
                    <button onClick={closeModal}>Close</button>
                </div>
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
                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={currentEvent.description}
                    onChange={handleEventModalChange}
                />
                <div className="button-group">
                    <button onClick={() => updateEvent(currentEvent._id, currentEvent)}>Update</button>
                    <button onClick={closeEventModal}>Close</button>
                </div>
            </Modal>

            <Modal
                isOpen={isContactModalOpen}
                onRequestClose={closeContactModal}
                contentLabel="Update Contact"
                className="Modal"
                overlayClassName="Overlay"
            >
                <h2>Update Contact</h2>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={currentContact.email}
                    onChange={handleContactModalChange}
                />
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={currentContact.name}
                    onChange={handleContactModalChange}
                />
                <textarea
                    name="message"
                    placeholder="Message"
                    value={currentContact.message}
                    onChange={handleContactModalChange}
                />
                <div className="button-group">
                    <button onClick={() => updateContact(currentContact._id, currentContact)}>Update</button>
                    <button onClick={closeContactModal}>Close</button>
                </div>
            </Modal>
        </div>
    );
};

export default Dashboard;
