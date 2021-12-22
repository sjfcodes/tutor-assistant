const router = require('express').Router();
const axios = require('axios');
const { AES, enc } = require('crypto-js');
const { Tutor } = require('../../models');
const { authorizeToken } = require('../../utils/auth');

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
  try {
    //  get tutor object
    const tutor = await Tutor.findById(req.tutor._id).populate('accessTokens');
    if (!tutor) return res.status(401).json('unauthorized');
    // compare request password to tutor objec password
    const correctPw = await tutor.isCorrectPassword(req.body.password);
    if (!correctPw) return res.status(401).json('unauthorized');

    // get calendly token
    const { token } = tutor.accessTokens.filter(({ name }) => name === 'calendly')[0];

    // decypt token with cryptoJS & user pw
    const bytes = AES.decrypt(token, req.body.password);
    const decryptedToken = bytes.toString(enc.Utf8);

    // make request with calendly token
    const url = 'https://api.calendly.com/users/me';
    const { data } = await axios.get(url, {
      headers: {
        authorization: `Bearer ${decryptedToken}`,
        'Content-Type': 'application/json',
      },
    });
    if (!data) return res.status(500).json('failed to find user');

    return res.json(data);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json('failed to find user');
  }
});

module.exports = router;