/* eslint-disable no-unused-vars */
const router = require('express').Router();
const { authorizeToken } = require('../../utils/auth');
const {
  AccessToken, Tutor, Calendly, Course,
} = require('../../models');
const { encryptToken } = require('../../utils/encryption');
const { getTutorById } = require('../../utils/helpers');

router.post('/:courseId', authorizeToken, async (req, res) => {
  try {
    //  get tutor document
    const { tutor } = await getTutorById(req.tutor._id);
    if (!tutor) return res.status(401).json('unauthorized');
    // compare request password to tutor saved password
    if (!await tutor.isCorrectPassword(req.body.password)) return res.status(401).json('unauthorized');

    //  encrypt token with current password
    const encryptedToken = encryptToken(req.body.token, req.body.password);
    const { calendly: { accessToken } } = await Course.findById(req.params.courseId);

    // if no token exists
    if (!accessToken) {
      try {
      // create db entry
        const { _id } = await AccessToken.create({ token: encryptedToken });
        if (!_id) return res.status(500).json('failed to create token');

        // add new document id to tutor
        const updated = await Course.findByIdAndUpdate(
          req.params.courseId,
          { calendly: { accessToken: _id, data: null } },
        );
        if (!updated) return res.status(500).json('failed to update user');

        // send new token id back to client to update local state
        return res.json({ _id });
      } catch (error) {
        console.error(error.message);
        return res.status(500).json({ location: 2, message: error.message });
      }
    }

    // if a token already exists
    try {
      // update existing document with new token
      await AccessToken.findByIdAndUpdate(accessToken, { token: encryptedToken });
      return res.json({ _id: accessToken });
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
