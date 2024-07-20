// const express = require('express');
// const router = express.Router();
// const Location = require('../models/Location');

// router.get('/top', async (req, res) => {
//   try {
//     const topLocations = await Location.find().sort({ stars: -1 }).limit(10);
//     res.json(topLocations);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// module.exports = router;


// In your backend route file (e.g., routes/locations.js)







// const express = require('express');
// const axios = require('axios');
// require('dotenv').config();
// const router = express.Router();
// const Location = require('../models/Location');

// const UNSPLASH_CLIENT_ID = process.env.UNSPLASH_CLIENT_ID;

// router.get('/top', async (req, res) => {
//   try {
//     // Fetch location data
//     const locations = await Location.find().sort({ stars: -1 }).limit(10);

//     // Fetch images for each location
//     const locationsWithImages = await Promise.all(
//       locations.map(async (location) => {
//         const { data } = await axios.get(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(location.name)}&client_id=${UNSPLASH_CLIENT_ID}`);
//         const imageUrl = data.results[0]?.urls?.regular || location.image;

//         // Update the location document with the new image URL
//         location.image = imageUrl;
//         await location.save();

//         return location;
//       })
//     );

//     res.json(locationsWithImages);
//   } catch (error) {
//     console.log("Failed to fetch top locations", error);
//     res.status(500).json({ error: 'Failed to fetch top locations' });
//   }
// });

// module.exports = router;



const express = require('express');
const axios = require('axios');
require('dotenv').config();
const router = express.Router();
const Location = require('../models/Location');

const UNSPLASH_CLIENT_ID = process.env.UNSPLASH_CLIENT_ID;

router.get('/top', async (req, res) => {
  try {
    // Fetch location data
    const locations = await Location.find().sort({ stars: -1 }).limit(10);

    // Fetch images for each location
    const locationsWithImages = await Promise.all(
      locations.map(async (location) => {
        // Append "places" to the location name for better image search results
        const query = `${encodeURIComponent(location.name)} places`;

        const { data } = await axios.get(`https://api.unsplash.com/search/photos?orientation=landscape&query=${query}&client_id=${UNSPLASH_CLIENT_ID}`);
        const imageUrl = data.results[0]?.urls?.regular || location.image;

        // Update the location document with the new image URL
        location.image = imageUrl;
        await location.save();

        return location;
      })
    );

    res.json(locationsWithImages);
  } catch (error) {
    console.log("Failed to fetch top locations", error);
    res.status(500).json({ error: 'Failed to fetch top locations' });
  }
});

module.exports = router;

