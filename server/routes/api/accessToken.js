/* eslint-disable no-unused-vars */
const router = require('express').Router();
const { authorizeToken } = require('../../utils/auth');
const {
  AccessToken, Tutor, Calendly, Course,
} = require('../../models');
const { encryptToken } = require('../../utils/encryption');
const { getTutorById } = require('../../utils/helpers');

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

router.post('/:courseId', authorizeToken, async (
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
    if (!tutor) return res.status(401).json('unauthorized');
    // compare request password to tutor saved password
    if (!await tutor.isCorrectPassword(password)) return res.status(401).json('unauthorized');

    //  encrypt token with current password
    const encryptedToken = encryptToken(token, password);
    const { calendly: { accessToken: existingTokenId } } = await Course.findById(courseId);

    // if no token exists
    if (!existingTokenId) {
      try {
        const newTokenId = await createTokenAndAddToCourse({ encryptedToken, courseId });
        if (!newTokenId) res.status(400).json({ message: 'failed to add token' });
        return res.json({ _id: newTokenId });
      } catch (error) {
        console.error(error.message);
        return res.status(500).json({ location: 2, message: error.message });
      }
    }

    // if a token already exists
    try {
      // update existing document with new token
      await AccessToken.findByIdAndUpdate(existingTokenId, { token: encryptedToken });
      return res.json({ _id: existingTokenId });
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ location: 3, message: error.message });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ location: 1, message: error.message });
  }
});

router.delete('/:tokenId', authorizeToken, async ({
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
    console.error(message);
    return res.status(500).json(message);
  }
});

module.exports = router;
