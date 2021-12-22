const router = require('express').Router();
// const axios = require('axios');

// console.log(process.env.CALENDLY_API_TOKEN);
// // const url = 'https://api.calendly.com/users/me';
// // const url = 'https://api.calendly.com/scheduled_events';
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

router.get('/users/me', (req, res) => {
  res.json('yo');
});

module.exports = router;
