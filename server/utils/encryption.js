const { AES, enc } = require('crypto-js');

const encryptToken = (token, password) => AES.encrypt(token, password).toString();
const decryptToken = (token, password) => AES.decrypt(token, password).toString(enc.Utf8);

module.exports = {
  encryptToken,
  decryptToken,
};
