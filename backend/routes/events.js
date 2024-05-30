const express = require('express');
const router = express.Router();
const {
    createEvent,
    getEvents,
    getEvent,
    updateEvent,
    deleteEvent,
    reserveEvent
} = require('../controllers/eventController');
const { verifyToken, checkRole } = require('../middleware/auth');

// Define routes for events
router.post('/', verifyToken, checkRole('admin'), createEvent);
router.get('/', getEvents); // Endpoint for fetching all events
router.get('/:id', getEvent);
router.put('/:id', verifyToken, checkRole('admin'), updateEvent);
router.delete('/:id', verifyToken, checkRole('admin'), deleteEvent);
router.post('/reserve', verifyToken, reserveEvent);

module.exports = router;
