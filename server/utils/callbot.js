const axios = require('axios');
/*
this bot is not necessarily part of this project,
simply a tool keep the email server and some other project servers from sleeping
*/
const endPoints = [
  'https://radcats-karaoke.herokuapp.com/',
  'https://sjf-react-email-templates.herokuapp.com/',
];

const refreshOtherServers = async (urls) => {
  try {
    const promises = urls.map((url) => axios.get(url).then(() => console.log(`${url} completed`)));
    await Promise.all(promises);
    console.log('callbot completed');
  } catch (error) {
    console.log(error);
  }
};

const minute = 60 * 1000;

setInterval(() => refreshOtherServers(endPoints), minute * 20);
