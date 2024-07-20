const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  stars: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  other: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
