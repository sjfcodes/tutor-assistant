const router = require('express').Router();
const axios = require('axios');
const { Calendly, Tutor } = require('../../models');
const { authorizeToken } = require('../../utils/auth');
const { getCalendlyEvents, getCalendlyHeaders } = require('../../utils/calendly-helpers');
const { getCalendlyToken } = require('../../utils/encryption');

router.post('/users/me', authorizeToken, async (req, res) => {
  let decryptedToken;
  try {
    // get decrypted calendly token
    decryptedToken = await getCalendlyToken(req.tutor._id, req.body.password);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      location: 0,
      message: error.message,
    });
  }

  try {
    // make request with calendly token
    const url = 'https://api.calendly.com/users/me';
    const options = { headers: getCalendlyHeaders(decryptedToken) };
    const { data: { resource } } = await axios.get(url, options);
    // update tutors details
    const { _id } = await Calendly.create({ ...resource });

    const tutor = await Tutor.findByIdAndUpdate(
      req.tutor._id,
      { calendly: _id },
      { new: true },
    ).catch((error) => res.status(500).json(error));
    // send resource to client to update local state
    return res.json({ tutor });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      location: 1,
      message: error.message,
    });
  }
});

router.post('/scheduled_events', authorizeToken, async (req, res) => {
  try {
    const data = await getCalendlyEvents(req);
    res.json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json(error.message);
  }
});

/**
 * GET all events with pagination
 * GET upcoming events
 */

module.exports = router;
