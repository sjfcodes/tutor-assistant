const { Schema, model } = require('mongoose');
const { getISOCurrentDateStamp } = require('../utils/dateTime');

const accessTokenSchema = new Schema({
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    default: () => getISOCurrentDateStamp(),
  },
});

const AccessToken = model('AccessToken', accessTokenSchema);

module.exports = AccessToken;
