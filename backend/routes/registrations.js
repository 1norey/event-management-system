const express = require('express');
const router = express.Router();
const { registerForEvent, getRegistrations } = require('../controllers/registrationController');
const auth = require('../middleware/auth');

router.post('/', auth, registerForEvent);
router.get('/', auth, getRegistrations);

module.exports = router;
