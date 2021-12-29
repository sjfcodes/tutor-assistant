const router = require('express').Router();
const { Tutor } = require('../../models');
const { signToken, authorizeToken } = require('../../utils/auth');
const { getCalendlyEvents } = require('../../utils/calendly-helpers');
const { encryptToken } = require('../../utils/encryption');
const {
  updateDocumentProperties, getTutorByEmail, getTutorById,
} = require('../../utils/helpers');

// create a new tutor
router.post('/', async ({ body }, res) => {
  try {
    const tutor = await Tutor.create(body);
    const { _id, password, email } = tutor;
    const accountKey = encryptToken(password, process.env.JWT_SECRET);
    const token = signToken({ _id, email, accountKey });

    tutor.password = null;
    return res.json({ token, tutor });
  } catch (error) {
    console.error(error);
    return res.status(500).json('failed to create tutor');
  }
});

// login tutor with email and password
router.post('/login', async (req, res) => {
  try {
    const { body: { email, password } } = req;
    const { tutor } = await getTutorByEmail(email);
    if (!tutor) return res.status(401).json('unauthorized');

    const correctPw = await tutor.isCorrectPassword(password);
    if (!correctPw) return res.status(401).json('unauthorized');

    // store encrypted password to access a users encrypted api keys
    const accountKey = encryptToken(password, process.env.JWT_SECRET);
    const { _id } = tutor;
    const token = signToken({ _id, email, accountKey });
    tutor.password = '';

    if (tutor.calendly?.uri) {
      req.tutor = { _id, email, accountKey };
      req.body.uri = tutor.calendly.uri;
      const calendlyMeetings = await getCalendlyEvents(req);
      return res.json({ token, tutor, calendlyMeetings });
    }

    return res.json({ token, tutor });
  } catch (error) {
    console.error(error);
    return res.status(401).json('unauthorized');
  }
});

// login tutor with token
router.get('/login', authorizeToken, async (req, res) => {
  try {
    const { tutor: { _id, accountKey } } = req;
    const { tutor } = await getTutorById(_id);
    if (!tutor) return res.status(401).json('unauthorized');

    const { email } = tutor;
    const token = signToken({ _id, email, accountKey });

    if (tutor.calendly?.uri) {
      req.body.uri = tutor.calendly.uri;
      const calendlyMeetings = await getCalendlyEvents(req);
      return res.json({ token, tutor, calendlyMeetings });
    }

    return res.json({ token, tutor });
  } catch (error) {
    console.error(error);
    return res.status(401).json('unauthorized');
  }
});

// allow a tutor to update their personal data
router.put('/', authorizeToken, async (req, res) => {
  try {
    const tutorDoc = await Tutor.findById(req.tutor._id);
    // config for properties allowed to update
    const allowUpdate = {
      firstName: true,
      lasName: true,
      email: true,
      timeZoneName: true,
      githubUsername: true,
      calendlyLink: true,
      meetingCount: true,
      password: false,
      courses: false,
      students: false,
      meetings: false,
      createdAt: false,
    };
    updateDocumentProperties(allowUpdate, tutorDoc, req.body);
    // save the updated document using the .save() method
    // https://mongoosejs.com/docs/documents.html#updating-using-queries
    const updated = await tutorDoc.save();

    if (!updated) return res.status(500).json('failed to update');
    return res.json('tutor updated');
  } catch (error) {
    console.error(error);
    return res.status(500).json('failed to update');
  }
});

// update a tutors password
router.put('/password', authorizeToken, async (req, res) => {
  try {
    const tutor = await getTutorById(req.tutor._id);
    const correctPw = await tutor.isCorrectPassword(req.body.password);
    if (!correctPw) return res.status(401).json('unauthorized');
    // update password to overwrite
    tutor.password = req.body.newPassword;
    const updated = await tutor.save();
    if (!updated) return res.status(500).json('failed to update');
    return res.json('password updated');
  } catch (error) {
    console.error(error);
    return res.status(401).json('unauthorized');
  }
});

// delete tutor
router.delete('/', authorizeToken, async (req, res) => {
  try {
    const tutor = await getTutorById(req.tutor._id);
    const correctPw = await tutor.isCorrectPassword(req.body.password);
    if (!correctPw) return res.status(401).json('unauthorized');
    await Tutor.findByIdAndDelete(tutor._id);
    return res.json('tutor deleted');
  } catch (error) {
    console.error(error);
    return res.status(401).json('unauthorized');
  }
});

module.exports = router;
