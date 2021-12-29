const { AES, enc } = require('crypto-js');
const { Tutor } = require('../models');

const encryptToken = (value, key) => AES.encrypt(value, key).toString();
const decryptToken = (value, key) => AES.decrypt(value, key).toString(enc.Utf8);

const getCalendlyToken = (tutorId, tutorPw) => new Promise((resolve, reject) => {
  //  get tutor object
  Tutor.findById(tutorId).populate('accessTokens')
    .then((tutor) => {
      if (!tutor) return reject(new Error('tutor not found'));
      // compare request password to tutor objec password
      const correctPw = tutor.isCorrectPassword(tutorPw);
      if (!correctPw) return reject(new Error('unauthorized'));
      // get encrypted calendly token
      const { token } = tutor.accessTokens.filter(({ name }) => name === 'calendly')[0];
      // decypt token
      const decryptedToken = decryptToken(token, tutorPw);
      if (!decryptedToken) return reject(new Error('token unavailable'));
      return resolve(decryptedToken);
    }).catch((error) => reject(error));
});

module.exports = {
  encryptToken,
  decryptToken,
  getCalendlyToken,
};
