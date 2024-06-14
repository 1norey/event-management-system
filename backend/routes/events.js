const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const auth = require('../middleware/auth');

// POST /api/events
router.post('/', eventController.createEvent);

// GET /api/events
router.get('/', eventController.getEvents);

// GET /api/events/:id
router.get('/:id', eventController.getEvent);

// PUT /api/events/:id
router.put('/:id', eventController.updateEvent);

// DELETE /api/events/:id
router.delete('/:id', eventController.deleteEvent);

// POST /api/events/reserve
router.post('/reserve', eventController.reserveEvent);

module.exports = router;
