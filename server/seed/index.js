/* eslint-disable no-console */
const db = require('../config/connection');
const {
  Tutor, EmailTemplate, Course,
  Student, Meeting, AccessToken,
} = require('../models');

const tutorSeeds = require('./tutor.json');
const emailTemplateSeeds = require('./emailTemplate.json');
const courseSeeds = require('./course.json');
const studentSeeds = require('./student');
const meetingSeeds = require('./meeting');
// const accessTokenSeeds = require('./accesstoken.json');

db.once('open', async () => {
  try {
    console.log('==> start db seeds');

    await Tutor.deleteMany({});
    await Course.deleteMany({});
    await Student.deleteMany({});
    await Meeting.deleteMany({});
    await EmailTemplate.deleteMany({});
    await AccessToken.deleteMany({});

    await Tutor.create(tutorSeeds);
    await Course.create(courseSeeds);
    await Student.create(studentSeeds);
    await Meeting.create(meetingSeeds);
    await EmailTemplate.create(emailTemplateSeeds);
    // await AccessToken.create(accessTokenSeeds);

    console.log('==> db seeds success\n');
  } catch (error) {
    console.error(error);
  }
  process.exit(0);
});
