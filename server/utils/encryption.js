const { AES, enc } = require('crypto-js');
const { Tutor } = require('../models');

const encryptToken = (value, key) => AES.encrypt(value, key).toString();
const decryptToken = (value, key) => AES.decrypt(value, key).toString(enc.Utf8);

const getCalendlyToken = async (tutorId, tutorPw) => {
  //  get tutor object
  const tutor = await Tutor.findById(tutorId)
    .populate({
      path: 'accessTokens',
      populate: [{ path: 'calendly', model: 'AccessToken' }],
    });

  if (!tutor) return null;

  // compare hashed passwords
  const correctPw = tutor.isCorrectPassword(tutorPw);
  if (!correctPw) return new Error('unauthorized');

  // get encrypted calendly token
  const { token } = tutor.accessTokens.calendly;
  // decypt token
  const decryptedToken = decryptToken(token, tutorPw);
  if (!decryptedToken) return null;

  return decryptedToken;
};

module.exports = {
  encryptToken,
  decryptToken,
  getCalendlyToken,
};
