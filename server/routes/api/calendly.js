/* eslint-disable no-unused-vars */
const router = require('express').Router();
const axios = require('axios');
const {
  Calendly, Course, Tutor, AccessToken,
} = require('../../models');
const { authorizeToken } = require('../../utils/auth');
const { getCalendlyMeetings, getCalendlyHeaders } = require('../../utils/calendly-helpers');
const { reportError } = require('../../utils/consoleColors');
const { getCalendlyToken, encryptToken } = require('../../utils/encryption');
const { getTutorById } = require('../../utils/helpers');

const getCalendlyUriFromCourse = async (courseId) => {
  const { calendly: { data } } = await Course.findById(courseId)
    .populate({ path: 'calendly', populate: { path: 'data', model: 'Calendly' } });
  return data.uri;
};

const createTokenAndAddToCourse = async ({ encryptedToken, courseId }) => {
  // create db entry
  const { _id } = await AccessToken.create({ token: encryptedToken });
  if (!_id) return null;
  // add new document id to tutor
  const updated = await Course.findByIdAndUpdate(
    courseId,
    { calendly: { accessToken: _id, data: null } },
  );
  if (!updated) return null;
  return _id;
};

router.post('/token/:courseId', authorizeToken, async (
  {
    tutor: { _id: tutorId },
    body: { password, token },
    params: { courseId },
  },
  res,
) => {
  try {
    //  get tutor document
    const { tutor } = await getTutorById(tutorId);
    if (!tutor) return res.status(401).json({ message: 'unauthorized' });
    // compare request password to tutor saved password
    if (!await tutor.isCorrectPassword(password)) return res.status(401).json({ message: 'unauthorized' });

    //  encrypt token with current password
    const encryptedToken = encryptToken(token, password);
    const { calendly: { accessToken: existingTokenId } } = await Course.findById(courseId);

    // if no token exists
    if (!existingTokenId) {
      try {
        const newTokenId = await createTokenAndAddToCourse({ encryptedToken, courseId });
        if (!newTokenId) res.status(400).json({ message: 'failed to add token' });
        return res.json({ _id: newTokenId });
      } catch ({ message }) {
        reportError(message);
        return res.status(500).json({ location: 1, message });
      }
    }

    // if a token already exists
    try {
      // update existing document with new token
      await AccessToken.findByIdAndUpdate(existingTokenId, { token: encryptedToken });
      return res.json({ _id: existingTokenId });
    } catch ({ message }) {
      reportError(message);
      return res.status(500).json({ location: 2, message });
    }
  } catch ({ message }) {
    reportError(message);
    return res.status(500).json({ location: 3, message });
  }
});

router.get('/meetings/:courseId', authorizeToken, async ({
  tutor: { accountKey },
  params: { courseId },
}, res) => {
  try {
    const uri = await getCalendlyUriFromCourse(courseId);
    if (uri) {
      const calendlyMeetings = await getCalendlyMeetings({ courseId, accountKey, uri });
      return res.json({ calendlyMeetings });
    }
    return res.status(404).json({ message: 'data unavailable' });
  } catch ({ message }) {
    reportError(message);
    return res.status(500).json({ location: 1, message });
  }
});

router.post('/sync', authorizeToken, async ({
  tutor: { _id: tutorId },
  body: { password, courseId },
}, res) => {
  try {
    // get tutor
    const tutor = await Tutor.findById(tutorId);
    if (!tutor) return res.status(404).json({ message: 'tutor not found' });
    // compare hashed passwords
    const correctPw = tutor.isCorrectPassword(password);
    if (!correctPw) return res.status(401).json({ message: 'unauthorized' });

    // setup calendly api call
    const url = 'https://api.calendly.com/users/me';
    const options = {
      headers: getCalendlyHeaders(
        await getCalendlyToken({ password, courseId }),
      ),
    };
    // make request with calendly token
    const { data: { resource } } = await axios.get(url, options);
    const { calendly: { data: existingData } } = await Course.findById(courseId);

    if (!resource) return res.status(400).json({ message: 'bad access token' });

    if (!existingData) {
      // save calendly resource
      const data = await Calendly.create(resource);
      // update course details
      await Course.findByIdAndUpdate(courseId, { 'calendly.data': data._id });

      // send resource to client to update local state
      return res.json({ calendly: { data: { data } } });
    }
    const updated = await Calendly.findByIdAndUpdate(existingData, resource);
    return res.json(updated);
  } catch ({ message }) {
    await Course.findByIdAndUpdate(courseId, { 'calendly.data': null });
    reportError(message);
    return res.status(500).json({ location: 2, message });
  }
});

router.delete('/token/:tokenId', authorizeToken, async ({
  params: { tokenId },
  body: { courseId },
}, res) => {
  try {
    const { calendly: { accessToken, data } } = await Course.findById(courseId);
    if (accessToken) await AccessToken.findByIdAndDelete(tokenId);
    if (data) await Calendly.findByIdAndDelete(data);
    await Course.findByIdAndUpdate(courseId, { calendly: { accessToken: null, data: null } });

    return res.json('token deleted');
  } catch ({ message }) {
    reportError(message);
    return res.status(500).json(message);
  }
});

module.exports = router;
