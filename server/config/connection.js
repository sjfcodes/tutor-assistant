require('dotenv').config('../');
const mongoose = require('mongoose');
const { fgYellow, fgCyan } = require('../utils/consoleColors/fgColors');
const { reportStatus, exitWithError, reportDbConnection } = require('../utils/consoleColors/index.js');
const { resetColor } = require('../utils/consoleColors/tools');

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

  const pattern = `Await DB connection: ${fgYellow}${printTime}${resetColor} ${fgCyan}milliseconds`;

  reportDbConnection(pattern);

  setTimeout(() => {
    if (loading) reportConnectionTime(seconds + 1);
  }, 1);
};

reportConnectionTime(1);

module.exports = mongoose.connection;
