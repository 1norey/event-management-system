const mongoose = require('mongoose');
const Event = require('../models/Event');
const jwt = require('jsonwebtoken');
const Reservation = require('../models/Reservation');

// Create an event
const createEvent = async (req, res) => {
    const { title, date, description } = req.body;
    try {
        const newEvent = new Event({ title, date, description });
        const event = await newEvent.save();
        res.json(event);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get all events
const getEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.json({ events });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get single event by ID
const getEvent = async (req, res) => {
    const { id } = req.params;

    // Validate the event ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: 'Invalid event ID' });
    }

    try {
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }
        res.json(event);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Update an event
// Example server-side route handler to update an event
const updateEvent = async (req, res) => {
    const { title, date, description } = req.body;

    try {
        // Find the event by ID
        let event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }

        // Update the event fields
        event.title = title;
        event.date = new Date(date); // Ensure date is stored as Date object

        event.description = description;

        // Save the updated event
        event = await event.save();

        res.json(event); // Respond with updated event
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};


// Delete an event
const deleteEvent = async (req, res) => {
    try {
        const eventId = req.params.id;
        if (!eventId) {
            return res.status(400).json({ msg: 'Event ID is required' });
        }

        let event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }

        await Event.findByIdAndDelete(eventId);
        res.json({ msg: 'Event removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};


// Reserve an event
const reserveEvent = async (req, res) => {
    const { eventId, numberOfTickets } = req.body;

    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        const reservation = new Reservation({ event: eventId, numberOfTickets });
        await reservation.save();

        res.status(200).json({ message: 'Event reserved successfully', reservation });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    createEvent,
    getEvents,
    getEvent,
    updateEvent,
    deleteEvent,
    reserveEvent
};
