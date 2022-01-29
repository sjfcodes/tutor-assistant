const { Schema, model } = require('mongoose');
const { getISOCurrentDateStamp } = require('../utils/dateTime');

const accessTokenSchema = new Schema({
  createdAt: {
    type: String,
    default: () => getISOCurrentDateStamp(),
  },
  token: {
    type: String,
    required: true,
  },
});

const AccessToken = model('AccessToken', accessTokenSchema);

module.exports = AccessToken;
