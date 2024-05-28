const express = require('express');
const router = express.Router();
const {
    createEvent,
    getEvents,
    getEvent,
    updateEvent,
    deleteEvent
} = require('../controllers/eventController');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

router.post('/', auth, role('admin'), createEvent);
router.get('/', getEvents);
router.get('/:id', getEvent);
router.put('/:id', auth, role('admin'), updateEvent);
router.delete('/:id', auth, role('admin'), deleteEvent);

module.exports = router;
