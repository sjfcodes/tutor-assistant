const tools = require('./tools');
const fgColors = require('./fgColors');

const {
  resetColor, ccUnderscore, eraseLine,
} = tools;

const {
  fgRed, fgGreen, fgYellow,
  fgMagenta, fgCyan,
} = fgColors;

const fgKeys = Object.keys(fgColors);
const spacer = (num = 3, char = '-') => {
  const getRandomColor = () => fgKeys[Math.floor(Math.random() * fgKeys.length)];
  let str = '';
  for (let i = 0; i < num; i += 1) {
    str += `${fgColors[getRandomColor()]}${char}  `;
  }
  process.stdout.write(`${str}${resetColor}`);
};

const statusPattern = (message) => `\n ${fgMagenta}${ccUnderscore}STATUS:${resetColor}${fgCyan}  ${message}…${resetColor}\n`;
const errorPattern = (message) => `\n ${fgRed}${ccUnderscore}ERROR:${resetColor}${fgYellow}    ${message}!${resetColor}\n`;
const successPattern = (message) => `\n ${fgGreen}${ccUnderscore}SUCCESS:${resetColor}${fgCyan}  ${message}!${resetColor}\n`;

const reportDbConnection = (message) => {
  // substring to remove new line character to create count effect
  const string = statusPattern(message).substring(1);
  // overwrites the existing line
  process.stdout.write(`${eraseLine}${string.substring(0, string.length - 1)}`);
};

// use console.log in production
const reportStatus = (message) => {
  process.stdout.write(statusPattern(message));
};
const reportError = (message) => {
  process.stdout.write(errorPattern(message));
};

const exitWithError = (message) => {
  process.stdout.write(errorPattern(message));
  spacer();
  process.exit(1);
};

const exitWithSuccess = (message) => {
  process.stdout.write(successPattern(message));
  spacer();
  process.exit(0);
};

module.exports = {
  reportDbConnection,
  reportStatus,
  reportError,
  exitWithError,
  exitWithSuccess,
};
