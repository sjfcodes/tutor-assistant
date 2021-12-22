const router = require('express').Router();
const { AES } = require('crypto-js');
const { authorizeToken } = require('../../utils/auth');
const { AccessToken, Tutor } = require('../../models');
const { addModelToTutor } = require('../../utils/helpers');

router.post('/', authorizeToken, async (req, res) => {
  console.log(req.body);

  // AES.encrypt(JSON.stringify(arr), pw).toString())

  try {
    //  get tutor object
    const tutor = await Tutor.findById(req.tutor._id);
    if (!tutor) return res.status(401).json('unauthorized');

    // compare request password to tutor objec password
    const correctPw = await tutor.isCorrectPassword(req.body.password);
    if (!correctPw) return res.status(401).json('unauthorized');

    //  encrypt token with current password
    const encryptedToken = AES.encrypt(req.body.token, req.body.password).toString();
    req.body.token = encryptedToken;

    // create db entry
    const { _id } = await AccessToken.create(req.body);
    if (!_id) return res.status(500).json('failed to create token:0');

    // update author
    const updated = await addModelToTutor(req.tutor._id, 'accessTokens', _id);
    if (!updated) return res.status(500).json('failed to update user');

    // send new token id back to client to update local state
    return res.json(_id);
  } catch (error) {
    console.error(error);
    return res.status(500).json('failed to create token:1');
  }
});

module.exports = router;