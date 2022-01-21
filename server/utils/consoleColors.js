const tools = {
  resetColor: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  ccUnderscore: '\x1b[4m',
  blink: '\x1b[5m',
  reverse: '\x1b[7m',
  hidden: '\x1b[8m',
  eraseLine: '\r\x1b[K',
};
const {
  resetColor, bright, dim, ccUnderscore,
  blink, reverse, hidden, eraseLine,
} = tools;

const fgColors = {
  fgBlack: '\x1b[30m',
  fgRed: '\x1b[31m',
  fgGreen: '\x1b[32m',
  fgYellow: '\x1b[33m',
  fgBlue: '\x1b[34m',
  fgMagenta: '\x1b[35m',
  fgCyan: '\x1b[36m',
  fgWhite: '\x1b[37m',
};
const fgKeys = Object.keys(fgColors);
const {
  fgBlack, fgRed, fgGreen, fgYellow,
  fgBlue, fgMagenta, fgCyan, fgWhite,
} = fgColors;

const bgColors = {
  bgBlack: '\x1b[40m',
  bgRed: '\x1b[41m',
  bgGreen: '\x1b[42m',
  bgYellow: '\x1b[43m',
  bgBlue: '\x1b[44m',
  bgMagenta: '\x1b[45m',
  bgCyan: '\x1b[46m',
  bgWhite: '\x1b[47m',
};
const {
  bgBlack, bgRed, bgGreen, bgYellow,
  bgBlue, bgMagenta, bgCyan, bgWhite,
} = bgColors;

const spacer = (num = 5, char = '~') => {
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
  resetColor,
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
