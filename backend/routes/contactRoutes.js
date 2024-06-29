const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// POST /api/contacts
router.post('/', contactController.createContact);

// GET /api/contacts
router.get('/', contactController.getContacts);

// GET /api/contacts/:id
router.get('/:id', contactController.getContactById);

// PUT /api/contacts/:id
router.put('/:id', contactController.updateContact);

// DELETE /api/contacts/:id
router.delete('/:id', contactController.deleteContact);

module.exports = router;
