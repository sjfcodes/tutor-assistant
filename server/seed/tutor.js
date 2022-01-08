require('dotenv').config();

const demo = {
  firstName: 'Tutor-demo',
  lastName: 'Account',
  email: 'demo@email.com',
  timeZoneName: 'America/Los_Angeles',
  githubUsername: 'tutor',
  scheduleLink: 'https://calendly.com',
  password: 'password',
  courses: [],
  emailTemplates: [],
};

const me = {
  firstName: 'Sam',
  lastName: 'Fox',
  email: 'samueljasonfox@gmail.com',
  timeZoneName: 'America/Los_Angeles',
  githubUsername: 'samuelfox1',
  scheduleLink: 'https://calendly.com',
  password: process.env.MY_PW,
  courses: [],
  emailTemplates: [],
};

module.exports = { demo, me };
