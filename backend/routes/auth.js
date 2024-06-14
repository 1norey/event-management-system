
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// POST /api/auth/register
router.post('/register', authController.register);

// POST /api/auth/login
router.post('/login', authController.login);

// GET /api/auth/user
router.get('/user', authController.getUsers);

router.delete('/user/:userId', authController.deleteUser);

// GET /api/auth/user/:userId
router.get('/user/:userId', authController.getUserById);

// PUT /api/auth/user/:userId
router.put('/user/:userId', authController.updateUserById);


module.exports = router;
