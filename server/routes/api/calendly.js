/* eslint-disable no-unused-vars */
const router = require('express').Router();
const axios = require('axios');
const { Calendly, Course, Tutor } = require('../../models');
const { authorizeToken } = require('../../utils/auth');
const { getCalendlyMeetings, getCalendlyHeaders } = require('../../utils/calendly-helpers');
const { getCalendlyToken } = require('../../utils/encryption');

const getCalendlyUriFromCourse = async (courseId) => {
  const { calendly: { data } } = await Course.findById(courseId)
    .populate({ path: 'calendly', populate: { path: 'data', model: 'Calendly' } });
  return data.uri;
};

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
    console.error(message);
    return res.status(500).json({ location: 1, message });
  }
});

router.post('/users/me', authorizeToken, async ({
  tutor: { _id: tutorId },
  body: { password, courseId },
}, res) => {
  try {
    // get tutor
    const tutor = await Tutor.findById(tutorId);
    if (!tutor) return res.status(404).json('tutor not found');
    // compare hashed passwords
    const correctPw = tutor.isCorrectPassword(password);
    if (!correctPw) return res.status(401).json('unauthorized');

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

    if (!resource) return res.status(400).json('bad accessToken');
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
    console.error(message);
    return res.status(500).json({ location: 2, message });
  }
});

module.exports = router;
