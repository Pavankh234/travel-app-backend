const express = require('express');
const router = express.Router();
const TravelAgency = require('../models/TravelAgency');

// Get all travel agencies for a specific location
router.get('/:location', async (req, res) => {
    try {
        const location = req.params.location;
        const agencies = await TravelAgency.find({ Location: location });
        res.json(agencies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a new travel agency
router.post('/', async (req, res) => {
    try {
        const agency = new TravelAgency(req.body);
        const savedAgency = await agency.save();
        res.status(201).json(savedAgency);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/detail/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const agency = await TravelAgency.findById(id);
        if (!agency) {
            return res.status(404).json({ message: 'Agency not found' });
        }
        res.json(agency);
    } catch (error) {
        console.error('Error fetching agency:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
