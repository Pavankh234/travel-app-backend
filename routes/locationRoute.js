// // const express = require('express');
// // const router = express.Router();
// // const Location = require('../models/Location');

// // router.get('/top', async (req, res) => {
// //   try {
// //     const topLocations = await Location.find().sort({ stars: -1 }).limit(10);
// //     res.json(topLocations);
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // });

// // module.exports = router;


// // In your backend route file (e.g., routes/locations.js)







// // const express = require('express');
// // const axios = require('axios');
// // require('dotenv').config();
// // const router = express.Router();
// // const Location = require('../models/Location');

// // const UNSPLASH_CLIENT_ID = process.env.UNSPLASH_CLIENT_ID;

// // router.get('/top', async (req, res) => {
// //   try {
// //     // Fetch location data
// //     const locations = await Location.find().sort({ stars: -1 }).limit(10);

// //     // Fetch images for each location
// //     const locationsWithImages = await Promise.all(
// //       locations.map(async (location) => {
// //         const { data } = await axios.get(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(location.name)}&client_id=${UNSPLASH_CLIENT_ID}`);
// //         const imageUrl = data.results[0]?.urls?.regular || location.image;

// //         // Update the location document with the new image URL
// //         location.image = imageUrl;
// //         await location.save();

// //         return location;
// //       })
// //     );

// //     res.json(locationsWithImages);
// //   } catch (error) {
// //     console.log("Failed to fetch top locations", error);
// //     res.status(500).json({ error: 'Failed to fetch top locations' });
// //   }
// // });

// // module.exports = router;



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
//         // Append "places" to the location name for better image search results
//         const query = `${encodeURIComponent(location.name)} place`;

//         const { data } = await axios.get(`https://api.unsplash.com/search/photos?orientation=landscape&query=${query}&client_id=${UNSPLASH_CLIENT_ID}`);
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


// router.patch('/:id/stars', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { increment } = req.body;

//     const location = await Location.findById(id);
//     if (!location) {
//       return res.status(404).json({ error: 'Location not found' });
//     }

//     location.stars += increment;
//     await location.save();

//     res.json(location);
//   } catch (error) {
//     console.error('Failed to update star count', error);
//     res.status(500).json({ error: 'Failed to update star count' });
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
    const locations = await Location.find().sort({ stars: -1 }).limit(10);

    const locationsWithImages = await Promise.all(
      locations.map(async (location) => {
        const query = `${encodeURIComponent(location.name)} place`;
        const { data } = await axios.get(`https://api.unsplash.com/search/photos?orientation=landscape&query=${query}&client_id=${UNSPLASH_CLIENT_ID}`);
        const imageUrl = data.results[0]?.urls?.regular || location.image;
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

router.patch('/:id/stars', async (req, res) => {
  try {
    const { id } = req.params;
    const { increment } = req.body;

    const location = await Location.findById(id);
    if (!location) {
      return res.status(404).json({ error: 'Location not found' });
    }

    location.stars += increment;
    await location.save();

    res.json(location);
  } catch (error) {
    console.error('Failed to update star count', error);
    res.status(500).json({ error: 'Failed to update star count' });
  }
});

router.get('/search', async (req, res) => {
  try {
    const { query } = req.query;
    const location = await Location.findOne({ name: { $regex: new RegExp(query, 'i') } });

    if (!location) {
      return res.status(404).json({ error: 'Location not found' });
    }

    const imageUrl = location.image;
    res.json({ ...location.toObject(), image: imageUrl });
  } catch (error) {
    console.error('Failed to fetch location', error);
    res.status(500).json({ error: 'Failed to fetch location' });
  }
});

module.exports = router;
