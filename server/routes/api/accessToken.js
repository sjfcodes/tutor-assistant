const router = require('express').Router();
const { authorizeToken } = require('../../utils/auth');
const { AccessToken, Tutor, Calendly } = require('../../models');
const { encryptToken } = require('../../utils/encryption');

router.post('/', authorizeToken, async (req, res) => {
  try {
    //  get tutor document
    const tutor = await Tutor.findById(req.tutor._id);
    if (!tutor) return res.status(401).json('unauthorized');
    // compare request password to tutor saved password
    if (!await tutor.isCorrectPassword(req.body.password)) return res.status(401).json('unauthorized');

    //  encrypt token with current password
    const encryptedToken = encryptToken(req.body.token, req.body.password);
    const existingKeyId = tutor.accessTokens.calendly;
    // if a token already exists
    if (existingKeyId) {
      try {
        // update existing document with new token
        await AccessToken.findByIdAndUpdate(existingKeyId, { token: encryptedToken });
        return res.json('updated existing token');
      } catch (error) {
        console.error(error.message);
        return res.status(500).json({ location: 2, message: error.message });
      }
    }

    // if no token exists
    try {
      // create db entry
      const { _id } = await AccessToken.create({ token: encryptedToken });
      if (!_id) return res.status(500).json('failed to create token:0');

      // add token document id to tutor
      const updated = await Tutor.findByIdAndUpdate(
        req.tutor._id,
        { accessTokens: { calendly: _id } },
      );
      if (!updated) return res.status(500).json('failed to update user');

      // send new token id back to client to update local state
      return res.json({ _id });
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ location: 3, message: error.message });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ location: 1, message: error.message });
  }
});

router.delete('/', authorizeToken, async ({ tutor, body: { tokenId } }, res) => {
  try {
    const { calendly } = await Tutor.findByIdAndUpdate(
      tutor._id,
      { calendly: null, accessTokens: { calendly: null } },
    );

    await Calendly.findByIdAndDelete(calendly);
    await AccessToken.findByIdAndDelete(tokenId);

    return res.json('token deleted');
  } catch ({ message }) {
    console.error(message);
    return res.status(500).json(message);
  }
});

module.exports = router;
