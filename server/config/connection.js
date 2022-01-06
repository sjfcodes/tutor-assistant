const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/tutor-assistant';

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  // eslint-disable-next-line no-console
  .then(() => console.log('==> db connection success'))
  .catch((err) => console.error(err));

module.exports = mongoose.connection;
