const router = require('express').Router();
const axios = require('axios');
const { Calendly, Tutor } = require('../../models');
const { authorizeToken } = require('../../utils/auth');
const { getCalendlyEvents, getCalendlyHeaders } = require('../../utils/calendly-helpers');
const { getCalendlyToken } = require('../../utils/encryption');
const { getTutorByEmail } = require('../../utils/helpers');

router.post('/users/me', authorizeToken, async ({ tutor: { _id: tutorId, email }, body: { password } }, res) => {
  let decryptedToken;
  try {
    const { tutor } = await getTutorByEmail(email);
    if (!tutor) return res.status(401).json('unauthorized');
    if (!await tutor.isCorrectPassword(password)) return res.status(401).json('unauthorized');
    // get decrypted calendly token
    decryptedToken = await getCalendlyToken(tutorId, password);
  } catch (error) {
    return res.status(500).json({
      location: 1,
      message: error.message,
    });
  }

  try {
    const url = 'https://api.calendly.com/users/me';
    const options = { headers: getCalendlyHeaders(decryptedToken) };
    // make request with calendly token
    const { data: { resource } } = await axios.get(url, options);

    // update tutors details
    const { _id: calendly } = await Calendly.create({ ...resource });

    const tutor = await Tutor.findByIdAndUpdate(
      tutorId,
      { calendly },
      { new: true },
    );
    // send resource to client to update local state
    return res.json({ tutor });
  } catch (error) {
    return res.status(500).json({
      location: 2,
      message: error.message,
    });
  }
});

router.post('/scheduled_events', authorizeToken, async ({
  tutor: { _id, accountKey },
  body: { uri },
}, res) => {
  try {
    const data = await getCalendlyEvents({ _id, accountKey, uri });
    res.json(data);
  } catch (error) {
    res.status(500).json({
      location: 1,
      message: error.message,
    });
  }
});

module.exports = router;
