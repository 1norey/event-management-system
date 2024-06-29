const Contact = require('../models/ContactUs');

const createContact = async (req, res) => {
    const { email, name, message } = req.body;

    try {
        const contact = new Contact({ email, name, message });
        await contact.save();
        res.status(201).json({ message: 'Contact created successfully', contact });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json(contacts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getContactById = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: 'Contact ID is required' });
    }

    try {
        const contact = await Contact.findById(id);
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.status(200).json(contact);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const updateContact = async (req, res) => {
    const { id } = req.params;
    const { email, name, message } = req.body;

    if (!id) {
        return res.status(400).json({ message: 'Contact ID is required' });
    }

    try {
        const contact = await Contact.findByIdAndUpdate(
            id,
            { email, name, message },
            { new: true, runValidators: true }
        );
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.status(200).json({ message: 'Contact updated successfully', contact });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteContact = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: 'Contact ID is required' });
    }

    try {
        const contact = await Contact.findByIdAndDelete(id);
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.status(200).json({ message: 'Contact deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    createContact,
    getContacts,
    getContactById,
    updateContact,
    deleteContact
};
