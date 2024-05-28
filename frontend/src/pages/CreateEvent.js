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
            categories: categories.split(','),
            tags: tags.split(',')
        };

        try {
            const res = await axios.post('http://localhost:5000/api/events', newEvent);
            console.log(res.data);
        } catch (err) {
            console.error(err.response.data);
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
                <div>
                    <input
                        type="text"
                        placeholder="Description"
                        name="description"
                        value={description}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div>
                    <input
                        type="date"
                        placeholder="Date"
                        name="date"
                        value={date}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Location"
                        name="location"
                        value={location}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Categories (comma separated)"
                        name="categories"
                        value={categories}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Tags (comma separated)"
                        name="tags"
                        value={tags}
                        onChange={e => onChange(e)}
                    />
                </div>
                <input type="submit" value="Create Event" />
            </form>
        </div>
    );
};

export default CreateEvent;
