const router = require('express').Router();
const { Tutor } = require('../models');
const { signToken, authorizeToken } = require('../utils/auth');
const { getCalendlyMeetings } = require('../utils/calendly-helpers');
const { reportError } = require('../utils/consoleColors/index.js');
const { encryptToken } = require('../utils/encryption');
const { getTutor, allowPropertyUpdate } = require('../utils/helpers');

// create a new tutor
router.post('/', async ({ body }, res) => {
  try {
    const tutor = await Tutor.create({
      ...body,
      email: body.email.toLowerCase(),
    });
    const { _id, password, email } = tutor;
    const accountKey = encryptToken(password, process.env.JWT_SECRET);
    const token = signToken({ _id, email, accountKey });

    tutor.password = null;
    return res.json({ token, tutor });
  } catch ({ message }) {
    reportError(message);
    return res.status(500).json({ location: 1, message });
  }
});

// login tutor with email and password
router.post('/login', async ({ body: { email, password } }, res) => {
  try {
    const { tutor } = await getTutor({ email });
    if (!tutor) return res.status(401).json({ message: 'unauthorized' });
    if (!await tutor.isCorrectPassword(password)) return res.status(401).json({ message: 'unauthorized' });

    // store encrypted password to access a users encrypted api keys
    const accountKey = encryptToken(password, process.env.JWT_SECRET);
    const { _id, calendly } = tutor;
    const token = signToken({ _id, email, accountKey });

    if (calendly?.uri) {
      const { uri } = calendly;
      const calendlyMeetings = await getCalendlyMeetings({ _id, accountKey, uri });
      return res.json({ token, tutor, calendlyMeetings });
    }

    tutor.password = null;
    return res.json({ token, tutor });
  } catch ({ message }) {
    reportError(message);
    return res.status(401).json({ location: 1, message });
  }
});

// login tutor with token
router.get('/login', authorizeToken, async ({ tutor: { _id, accountKey } }, res) => {
  try {
    const { tutor } = await getTutor({ _id });
    if (!tutor) return res.status(401).json({ message: 'unauthorized' });

    const { email } = tutor;
    const token = signToken({ _id, email, accountKey });

    tutor.password = null;
    return res.json({ token, tutor });
  } catch ({ message }) {
    reportError(message);
    return res.status(401).json({ location: 1, message: message || 'unauthorized' });
  }
});

// allow a tutor to update their personal data
router.put('/', authorizeToken, async ({ tutor: { _id }, body }, res) => {
  try {
    // config for properties allowed to update
    const allowUpdate = {
      firstName: true,
      lastName: true,
      email: true,
      timeZoneName: true,
      githubUsername: true,
      scheduleLink: true,
      meetingCount: true,
      password: false,
      courses: false,
      students: false,
      meetings: false,
      createdAt: false,
    };
    const allowedToUpdate = allowPropertyUpdate(allowUpdate, body);
    if (!allowedToUpdate) return res.status(401).json({ message: 'unauthorized' });

    const updated = await Tutor.findByIdAndUpdate(_id, body, { new: true });
    if (!updated) return res.status(500).json({ message: 'update failed' });

    updated.password = null;
    return res.json(updated);
  } catch ({ message }) {
    reportError(message);
    return res.status(500).json({ location: 1, message });
  }
});

// update a tutors password
router.put('/password', authorizeToken, async ({ tutor: { _id }, body }, res) => {
  try {
    const tutorDoc = await getTutor({ _id });
    if (!await tutorDoc.isCorrectPassword(body.password)) return res.status(401).json({ message: 'unauthorized' });

    // update password to overwrite
    tutorDoc.password = body.newPassword;
    const updated = await tutorDoc.save();
    if (!updated) return res.status(500).json('update failed');
    return res.json('password updated');
  } catch ({ message }) {
    reportError(message);
    return res.status(500).json({ location: 1, message });
  }
});

// delete tutor
router.delete('/', authorizeToken, async ({ tutor: { _id }, body }, res) => {
  try {
    const tutorDoc = await getTutor({ _id });
    if (!await tutorDoc.isCorrectPassword(body.password)) return res.status(401).json({ message: 'unauthorized' });
    await Tutor.findByIdAndDelete(_id);
    return res.json('tutor deleted');
  } catch ({ message }) {
    reportError(message);
    return res.status(500).json({ location: 1, message });
  }
});

module.exports = router;
