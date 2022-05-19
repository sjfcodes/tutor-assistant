/* eslint-disable no-console */
/*
this bot is not necessarily part of this project,
simply a tool keep the email server and some other project servers from sleeping
*/
const axios = require('axios');
const { reportStatus, reportError } = require('./consoleColors/index.js');

const minute = 60 * 1000;
const endPoints = [
  'https://radcats-karaoke.herokuapp.com/',
//   'https://sjf-react-email-templates.herokuapp.com/',
];

const refreshOtherServers = async (urls) => {
  try {
    const promises = urls.map((url) => axios.get(url));
    await Promise.all(promises);
    reportStatus('callbot completed');
  } catch (error) {
    reportError(error.message);
  }
};

refreshOtherServers(endPoints);
setInterval(() => refreshOtherServers(endPoints), minute * 30);
