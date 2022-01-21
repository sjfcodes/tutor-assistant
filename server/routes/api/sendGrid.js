const router = require('express').Router();
const sgMail = require('@sendgrid/mail');
const { AccessToken, Tutor } = require('../../models');
const { authorizeToken } = require('../../utils/auth');
const { reportError } = require('../../utils/consoleColors');
const { encryptToken, decryptToken } = require('../../utils/encryption');
const { getTutorById } = require('../../utils/helpers');

const createTokenAndAddToTutor = async ({ encryptedToken, tutorId }) => {
  // create db entry
  const { _id } = await AccessToken.create({ token: encryptedToken });
  if (!_id) return null;
  // add new document id to tutor
  const updated = await Tutor.findByIdAndUpdate(
    tutorId,
    { sendGrid: { accessToken: _id } },
  );
  if (!updated) return null;
  return _id;
};

const getSendGridToken = async ({ password, tutorId }) => {
  // get encrypted calendly token from course
  const { sendGrid: { accessToken: { token } } } = await Tutor.findById(tutorId)
    .populate({
      path: 'sendGrid',
      populate: { path: 'accessToken', model: 'AccessToken' },
    });

  // decypt token
  const decryptedToken = decryptToken(token, password);
  if (!decryptedToken) return null;
  return decryptedToken;
};

router.post('/add-token', authorizeToken, async (
  {
    tutor: { _id: tutorId },
    body: { password, token },
  },
  res,
) => {
  try {
    //  get tutor document
    const { tutor } = await getTutorById(tutorId);
    if (!tutor) return res.status(401).json({ message: 'unauthorized' });
    // compare request password to tutor saved password
    if (!await tutor.isCorrectPassword(password)) return res.status(401).json({ message: 'unauthorized' });
    const { sendGrid: { accessToken: existingTokenId } } = tutor;
    //  encrypt token with current password
    const encryptedToken = encryptToken(token, password);

    // if no token exists
    if (!existingTokenId) {
      try {
        const newTokenId = await createTokenAndAddToTutor({ encryptedToken, tutorId });
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

router.post('/email', authorizeToken, async ({
  tutor: {
    _id: tutorId,
    email: tutorEmail,
    accountKey,
  },
  body: {
    studentEmail, subject, text, html,
  },
}, res) => {
  try {
    // using Twilio SendGrid's v3 Node.js Library
    // https://github.com/sendgrid/sendgrid-nodejs
    const password = decryptToken(accountKey, process.env.JWT_SECRET);
    const decryptedToken = await getSendGridToken({ tutorId, password });
    sgMail.setApiKey(decryptedToken);
    const msg = {
      to: studentEmail, // your recipient's email
      from: tutorEmail, // your sendgrid veriefied email
      subject,
      text,
      html,
    };
    const response = await sgMail.send(msg);
    return res.json(response);
  } catch ({ message }) {
    reportError(message);
    return res.status(500).json({ location: 1, message });
  }
});

router.delete('/token/:tokenId', authorizeToken, async ({
  params: { tokenId },
  tutor: { _id: tutorId },
}, res) => {
  try {
    await AccessToken.findByIdAndDelete(tokenId);
    await Tutor.findByIdAndUpdate(tutorId, { sendGrid: { accessToken: null } });

    return res.json('token deleted');
  } catch ({ message }) {
    reportError(message);
    return res.status(500).json(message);
  }
});

module.exports = router;
