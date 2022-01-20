/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

const ccReset = '\x1b[0m';
const bright = '\x1b[1m';
const dim = '\x1b[2m';
const ccUnderscore = '\x1b[4m';
const blink = '\x1b[5m';
const reverse = '\x1b[7m';
const hidden = '\x1b[8m';
const eraseLine = '\r\x1b[K';

const fgBlack = '\x1b[30m';
const fgRed = '\x1b[31m';
const fgGreen = '\x1b[32m';
const fgYellow = '\x1b[33m';
const fgBlue = '\x1b[34m';
const fgMagenta = '\x1b[35m';
const fgCyan = '\x1b[36m';
const fgWhite = '\x1b[37m';

const bgBlack = '\x1b[40m';
const bgRed = '\x1b[41m';
const bgGreen = '\x1b[42m';
const bgYellow = '\x1b[43m';
const bgBlue = '\x1b[44m';
const bgMagenta = '\x1b[45m';
const bgCyan = '\x1b[46m';
const bgWhite = '\x1b[47m';

const statusPattern = (message) => `\n  ${fgMagenta}${ccUnderscore}STATUS:${ccReset}${fgCyan}  ${message}…${ccReset}`;
const errorPattern = (message) => `\n  ${fgRed}${ccUnderscore}ERROR:${ccReset}${fgYellow}    ${message}!\n${ccReset}`;
const successPattern = (message) => `\n  ${fgGreen}${ccUnderscore}SUCCESS:${ccReset}${fgYellow}  ${message}!\n${ccReset}`;

const reportDbConnection = (message) => {
  // substring to remove new line character to create count effect
  process.stdout.write(`${eraseLine} ${statusPattern(message).substring(2)}`);
};
const reportStatus = (message) => {
  process.stdout.write(statusPattern(message));
};

const exitWithError = (message) => {
  process.stdout.write(errorPattern(message));
  process.exit(1);
};

const exitWithSuccess = (message) => {
  process.stdout.write(successPattern(message));
  process.exit(0);
};

module.exports = {
  reportDbConnection,
  reportStatus,
  exitWithError,
  exitWithSuccess,
  ccReset,
  bright,
  dim,
  bgWhite,
  ccUnderscore,
  bgCyan,
  blink,
  bgMagenta,
  reverse,
  bgBlue,
  hidden,
  bgYellow,
  eraseLine,
  bgGreen,
  bgRed,
  fgBlack,
  bgBlack,
  fgRed,
  fgWhite,
  fgGreen,
  fgCyan,
  fgMagenta,
  fgBlue,
  fgYellow,
};
