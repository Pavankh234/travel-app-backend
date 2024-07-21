const mongoose = require('mongoose');

// Define the schema for TravelAgency
const travelAgencySchema = new mongoose.Schema({
    AgencyName: {
        type: String,
        required: true
    },
    OwnerName: {
        type: String,
        required: true
    },
    Location: {
        type: String,
        required: true
    },
    ContactNumber: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    VehicleTypes: {
        TwoWheeler: {
            count: {
                type: Number,
                default: 0
            },
            price: {
                type: Number,
                default: 0
            }
        },
        FourSeater: {
            count: {
                type: Number,
                default: 0
            },
            price: {
                type: Number,
                default: 0
            }
        },
        SevenSeater: {
            count: {
                type: Number,
                default: 0
            },
            price: {
                type: Number,
                default: 0
            }
        },
        TempoTraveller: {
            count: {
                type: Number,
                default: 0
            },
            price: {
                type: Number,
                default: 0
            }
        },
        MiniBus: {
            count: {
                type: Number,
                default: 0
            },
            price: {
                type: Number,
                default: 0
            }
        },
        Bus: {
            count: {
                type: Number,
                default: 0
            },
            price: {
                type: Number,
                default: 0
            }
        }
    },
    Image: {
        type: String,
        required: false
    }
});

// Define and export the model
const TravelAgency = mongoose.model('TravelAgency', travelAgencySchema);

module.exports = TravelAgency;
