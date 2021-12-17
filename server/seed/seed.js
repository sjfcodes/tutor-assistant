/* eslint-disable no-console */
const db = require('../config/connection');
const {
  Tutor, EmailTemplate, Course, Student, Meeting,
} = require('../models');

const tutorSeeds = require('./tutor.json');
const emailTemplateSeeds = require('./emailTemplate.json');
const courseSeeds = require('./course.json');
const studentSeeds = require('./student.json');
const meetingSeeds = require('./meeting');

/**
 * hash for password: 'password'
 * $2b$10$BQjgtZGdeDL1yxU3sJSNzucXFHETbx8dEQdRbuvVFih4eeRk7Cg3q
 */

db.once('open', async () => {
  try {
    console.log('==> start db seeds');

    await Tutor.deleteMany({});
    await EmailTemplate.deleteMany({});
    await Course.deleteMany({});
    await Student.deleteMany({});
    await Meeting.deleteMany({});

    await Tutor.create(tutorSeeds);
    await EmailTemplate.create(emailTemplateSeeds);
    await Course.create(courseSeeds);
    await Student.create(studentSeeds);
    await Meeting.create(meetingSeeds);

    console.log('==> db seeds success\n');
  } catch (error) {
    console.error(error);
  }
  process.exit(0);
});
