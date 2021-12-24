const router = require('express').Router();
const axios = require('axios');
const { Tutor } = require('../../models');
const { authorizeToken } = require('../../utils/auth');
const { decryptToken } = require('../../utils/encryption');

// console.log(process.env.CALENDLY_API_TOKEN);
// const url = 'https://api.calendly.com/scheduled_events';
// axios.get(url, {
//   params: {
//     user: 'https://api.calendly.com/users/CAGFV4L437ZGBDQI',
//     count: 3,
//     min_start_time: new Date().toISOString(),
//   },
//   headers: {
//     authorization: `Bearer ${process.env.CALENDLY_API_TOKEN}`,
//     'Content-Type': 'application/json',
//   },
// })
//   .then(({ data }) => {
//     console.log(data);
//   })
//   .catch((error) => console.error(error.message));

/**
 * add auth token
 * GET request to collect user uri: https://api.calendly.com/users/me
 * Get request to collect all events with pagination
 * Get request to collect all upcoming events
 */

router.post('/users/me', authorizeToken, async (req, res) => {
  let tutor;
  let decryptedToken;

  try {
    //  get tutor object
    tutor = await Tutor.findById(req.tutor._id).populate('accessTokens');
    // compare request password to tutor objec password
    const correctPw = await tutor.isCorrectPassword(req.body.password);
    if (!correctPw) return res.status(401).json('unauthorized');
  } catch (error) {
    console.error(error);
    return res.status(500).json('failed:0');
  }

  try {
    // get encrypted calendly token
    const { token } = tutor.accessTokens.filter(({ name }) => name === 'calendly')[0];
    // decypt token
    decryptedToken = decryptToken(token, req.body.password);
  } catch (error) {
    console.error(error);
    return res.status(500).json('failed:1');
  }

  try {
    // make request with calendly token
    const url = 'https://api.calendly.com/users/me';
    const { data: { resource } } = await axios.get(url, {
      headers: {
        authorization: `Bearer ${decryptedToken}`,
        'Content-Type': 'application/json',
      },
    });
    if (!Object.keys(resource).length) return res.status(500).json('failed:2');
    tutor.resources.calendly = resource;
    tutor.save();
    return res.json({ resource });
  } catch (error) {
    console.error(error);
    return res.status(500).json('failed:3');
  }
});

module.exports = router;
