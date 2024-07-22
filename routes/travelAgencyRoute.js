const express = require('express');
const router = express.Router();
const TravelAgency = require('../models/TravelAgency');
const Booking = require('../models/Booking'); // Import the Booking model


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



// router.post('/book/:id', async (req, res) => {
//     const { id } = req.params;
//     const { type, quantity } = req.body;

//     try {
//         const agency = await TravelAgency.findById(id);
//         if (!agency) {
//             return res.status(404).json({ message: 'Agency not found' });
//         }

//         if (quantity > agency.VehicleTypes[type].count) {
//             return res.status(400).json({ message: 'Requested quantity exceeds available count' });
//         }

//         agency.VehicleTypes[type].count -= quantity;
//         await agency.save();
        
//         res.json({ success: true });
//     } catch (error) {
//         console.error('Error booking vehicle:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// });

router.post('/book/:id', async (req, res) => {
    const { id } = req.params;
    const { type, quantity, userId, location } = req.body;

    try {
        const agency = await TravelAgency.findById(id);
        if (!agency) {
            return res.status(404).json({ message: 'Agency not found' });
        }

        if (quantity > agency.VehicleTypes[type].count) {
            return res.status(400).json({ message: 'Requested quantity exceeds available count' });
        }

        // Update vehicle count
        agency.VehicleTypes[type].count -= quantity;
        await agency.save();

        // Create a new booking record
        const booking = new Booking({
            userId,
            travelAgencyId: id,
            location,
            type,
            count: quantity
        });
        await booking.save();

        res.json({ success: true });
    } catch (error) {
        console.error('Error booking vehicle:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;
