const mongoose = require('mongoose');

// Define the schema for Booking
const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    travelAgencyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TravelAgency',
        required: true
    },
    location: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        required: true
    }
});

// Define and export the model
const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
