const Registration = require('../models/Registration');
const Event = require('../models/Event');
const User = require('../models/User');

exports.registerForEvent = async (req, res) => {
    try {
        const { eventId } = req.body;

        let registration = new Registration({
            user: req.user.id,
            event: eventId
        });

        await registration.save();
        res.json(registration);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getRegistrations = async (req, res) => {
    try {
        const registrations = await Registration.find({ user: req.user.id }).populate('event');
        res.json(registrations);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
