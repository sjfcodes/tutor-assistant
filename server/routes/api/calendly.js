const router = require('express').Router();
const axios = require('axios');
const { Tutor } = require('../../models');
const { authorizeToken } = require('../../utils/auth');
const { getCalendlyEvents, getCalendlyHeaders } = require('../../utils/calendly-helpers');
const { getCalendlyToken } = require('../../utils/encryption');

router.post('/users/me', authorizeToken, async (req, res) => {
  let decryptedToken;
  try {
    // get decrypted calendly token
    decryptedToken = await getCalendlyToken(req.tutor._id, req.body.password);
  } catch (error) {
    console.error(error);
    return res.status(500).json('failed:3');
  }
  try {
    // make request with calendly token
    const url = 'https://api.calendly.com/users/me';
    const options = { headers: getCalendlyHeaders(decryptedToken) };
    const { data: { resource } } = await axios.get(url, options);
    // if resource is object is empty
    if (!Object.keys(resource).length) return res.status(500).json('failed:2');
    // update tutors details
    await Tutor
      .findByIdAndUpdate(
        req.tutor._id,
        { $set: { resources: { calendly: { ...resource } } } },
        { upsert: true },
      );
    // send resource to client to update local state
    req.body.uri = resource.uri;
    return res.json({ resource });
  } catch (error) {
    console.error(error);
    return res.status(500).json('failed:3');
  }
});

router.post('/scheduled_events', authorizeToken, async (req, res) => {
  try {
    const data = await getCalendlyEvents(req);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json(error.message);
  }
});

/**
 * GET all events with pagination
 * GET upcoming events
 */

module.exports = router;
