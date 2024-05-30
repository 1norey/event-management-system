// controllers/eventController.js

const Event = require('../models/Event');
const Reservation = require('../models/Reservation');

const createEvent = async (req, res) => {
    const { title, description, date, location, categories, tags } = req.body;
    try {
        const newEvent = new Event({
            title,
            description,
            date,
            location,
            categories: categories.split(',').map(category => category.trim()),
            tags: tags.split(',').map(tag => tag.trim())
        });
        await newEvent.save();
        res.status(201).json({ message: 'Event created successfully', event: newEvent });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json({ events });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


const getEvent = async (req, res) => {
    const eventId = req.params.id;
    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json({ event });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const updateEvent = async (req, res) => {
    const eventId = req.params.id;
    const { title, description, date, location, categories, tags } = req.body;
    try {
        const updatedEvent = await Event.findByIdAndUpdate(eventId, {
            title,
            description,
            date,
            location,
            categories: categories.split(',').map(category => category.trim()),
            tags: tags.split(',').map(tag => tag.trim())
        }, { new: true });
        if (!updatedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json({ message: 'Event updated successfully', event: updatedEvent });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteEvent = async (req, res) => {
    const eventId = req.params.id;
    try {
        const deletedEvent = await Event.findByIdAndDelete(eventId);
        if (!deletedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const reserveEvent = async (req, res) => {
    const { eventId, numberOfTickets } = req.body;
    const userId = req.user.id; // Assuming req.user is populated by auth middleware

    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        const reservation = new Reservation({
            event: eventId,
            user: userId,
            numberOfTickets
        });

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
