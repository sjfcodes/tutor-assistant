const mongoose = require('mongoose');
require('dotenv').config('../');

const {
  reportStatus, exitWithError, reportDbConnection, fgYellow, ccReset, fgCyan,
} = require('../utils/consoleColors');

const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/tutor-assistant';
let loading = true;

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    loading = false;
    reportStatus('DB connection success');
  })
  .catch((err) => {
    loading = false;
    exitWithError(err);
  });

const reportConnectionTime = (seconds) => {
  const printTime = seconds < 10
    ? `0${seconds}`
    : `${seconds}`;

  const pattern = `Await DB connection: ${fgYellow}${printTime}${ccReset} ${fgCyan}milliseconds`;

  reportDbConnection(pattern);

  setTimeout(() => {
    if (loading) reportConnectionTime(seconds + 1);
  }, 1);
};

reportConnectionTime(1);

module.exports = mongoose.connection;
