const { AES, enc } = require('crypto-js');
const { Course } = require('../models');

const encryptToken = (value, key) => AES.encrypt(value, key).toString();
const decryptToken = (value, key) => AES.decrypt(value, key).toString(enc.Utf8);

const getCalendlyToken = async ({ password, courseId }) => {
  // get encrypted calendly token from course
  const { calendly: { accessToken: { token } } } = await Course.findById(courseId)
    .populate({
      path: 'calendly',
      populate: { path: 'accessToken', model: 'AccessToken' },
    });

  // decypt token
  const decryptedToken = decryptToken(token, password);
  if (!decryptedToken) return null;
  return decryptedToken;
};

module.exports = {
  encryptToken,
  decryptToken,
  getCalendlyToken,
};
