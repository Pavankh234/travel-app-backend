const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const TravelAgency = require('../models/TravelAgency');
const User = require('../models/User');

// Create a new booking
router.post('/', async (req, res) => {
    const { userId, travelAgencyId, location, type, count } = req.body;

    try {
        const agency = await TravelAgency.findById(travelAgencyId);
        if (!agency) {
            return res.status(404).json({ message: 'Travel agency not found' });
        }

        if (count > agency.VehicleTypes[type].count) {
            return res.status(400).json({ message: 'Requested quantity exceeds available count' });
        }

        // Create the booking
        const booking = new Booking({
            userId,
            travelAgencyId,
            location,
            type,
            count
        });

        // Save the booking
        await booking.save();

        // Update the travel agency's vehicle count
        agency.VehicleTypes[type].count -= count;
        await agency.save();

        res.status(201).json({ success: true, booking });
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
