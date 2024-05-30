// src/pages/CreateEvent.js

import React, { useState } from 'react';
import axios from 'axios';

const CreateEvent = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        location: '',
        categories: '',
        tags: ''
    });

    const { title, description, date, location, categories, tags } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();

        const newEvent = {
            title,
            description,
            date,
            location,
            categories: categories.split(',').map(category => category.trim()),
            tags: tags.split(',').map(tag => tag.trim())
        };

        try {
            const res = await axios.post('/api/events', newEvent);
            console.log(res.data);
        } catch (err) {
            console.error('Error creating event:', err);
        }
    };

    return (
        <div>
            <h1>Create Event</h1>
            <form onSubmit={e => onSubmit(e)}>
                <div>
                    <input
                        type="text"
                        placeholder="Title"
                        name="title"
                        value={title}
                        onChange={e => onChange(e)}
                    />
                </div>
                {/* Other input fields */}
                <input type="submit" value="Create Event" />
            </form>
        </div>
    );
};

export default CreateEvent;
