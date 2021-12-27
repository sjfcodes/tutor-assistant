const router = require('express').Router();
const axios = require('axios');
const { Tutor } = require('../../models');
const { authorizeToken } = require('../../utils/auth');
const { getCalendlyToken, decryptToken } = require('../../utils/encryption');

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

router.post('/scheduled_events', authorizeToken, async (req, res) => {
  let decryptedToken;
  console.log(req.tutor);
  try {
    // get decrypted calendly token
    const userPw = decryptToken(req.tutor.accountKey, process.env.JWT_SECRET);
    console.log(userPw);
    decryptedToken = await getCalendlyToken(req.tutor._id, userPw);
  } catch (error) {
    console.error(error);
    return res.status(500).json('failed:3');
  }
  console.log(req.body.uri);
  const url = 'https://api.calendly.com/scheduled_events';

  const headers = {
    authorization: `Bearer ${decryptedToken}`,
    'Content-Type': 'application/json',
  };

  const params = {
    user: req.body.uri,
    // count: 3,
    min_start_time: new Date().toISOString(),
  };

  try {
    // get events
    const { data: { collection } } = await axios.get(url, { headers, params });
    // get invitee info for all events
    const withInviteeInfo = await Promise.all(collection.map(async (event) => {
      const copy = { ...event };
      copy.invitee_info = await axios.get(`${event.uri}/invitees`, { headers }).then(({ data }) => data.collection);
      return copy;
    }));

    return res.json(withInviteeInfo);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json('failed:2');
  }
});

router.post('/users/me', authorizeToken, async (req, res) => {
  let decryptedToken;

  try {
    // get decrypted calendly token
    decryptedToken = await getCalendlyToken(req.tutor._id, req.body.password);
  } catch (error) {
    console.error(error);
    return res.status(500).json('failed:3');
  }

  const url = 'https://api.calendly.com/users/me';
  const options = {
    headers: {
      authorization: `Bearer ${decryptedToken}`,
      'Content-Type': 'application/json',
    },
  };

  try {
    // make request with calendly token
    const { data: { resource } } = await axios.get(url, options);
    // if resource is object is empty
    if (!Object.keys(resource).length) return res.status(500).json('failed:2');
    // update tutors details
    await Tutor.findByIdAndUpdate(req.tutor._id, { resources: { calendly: resource } });
    // send resource to client to update local state
    return res.json({ resource });
  } catch (error) {
    console.error(error);
    return res.status(500).json('failed:3');
  }
});

module.exports = router;
