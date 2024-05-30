const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const role = require('../middleware/auth');

// Add your controller logic for the dashboard here
router.get('/', auth.verifyToken, role.checkRole('admin'), (req, res) => {
    res.json({ msg: 'Welcome to the admin dashboard' });
});

module.exports = router;
