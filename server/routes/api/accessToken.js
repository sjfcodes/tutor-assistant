const router = require('express').Router();
const { authorizeToken } = require('../../utils/auth');
const { AccessToken, Tutor } = require('../../models');
const { addModelToTutor } = require('../../utils/helpers');
const { encryptToken } = require('../../utils/encryption');

router.post('/', authorizeToken, async (req, res) => {
  let encryptedToken;
  let existingToken;
  try {
    //  get tutor object
    const tutor = await Tutor.findById(req.tutor._id).populate('accessTokens');
    if (!tutor) return res.status(401).json('unauthorized');
    // compare request password to tutor objec password
    if (!await tutor.isCorrectPassword(req.body.password)) return res.status(401).json('unauthorized');

    //  encrypt token with current password
    encryptedToken = encryptToken(req.body.token, req.body.password);
    existingToken = tutor.accessTokens.filter(({ name }) => name === req.body.name);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      location: 1,
      message: error.message,
    });
  }

  if (existingToken.length) {
    try {
      const tokenId = existingToken[0]._id;
      await AccessToken.findByIdAndUpdate(
        tokenId,
        { token: encryptedToken },
        { new: true },
      );
      return res.json(tokenId);
    } catch (error) {
      console.error(error.message);
      console.error(error);
      return res.status(500).json({
        location: 2,
        message: error.message,
      });
    }
  } else {
    try {
      req.body.token = encryptedToken;
      // create db entry
      const { _id } = await AccessToken.create(req.body);
      if (!_id) return res.status(500).json('failed to create token:0');

      // update author
      const updated = await addModelToTutor(req.tutor._id, 'accessTokens', _id);
      if (!updated) return res.status(500).json('failed to update user');

      // send new token id back to client to update local state
      return res.json({ _id });
    } catch (error) {
      console.error(error.message);
      console.error(error);
      return res.status(500).json({
        location: 3,
        message: error.message,
      });
    }
  }
});

module.exports = router;
