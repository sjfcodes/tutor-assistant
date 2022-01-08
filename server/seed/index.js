/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const db = require('../config/connection');
const {
  Tutor, EmailTemplate, Course,
  Student, Meeting, AccessToken,
  Calendly,
} = require('../models');

const { demo, me } = require('./tutor');
const emailTemplateSeed = require('./emailTemplate.json');
const courseSeed = require('./course.json');
const studentSeeds = require('./student');
const meetingSeeds = require('./meeting');
const tokenSeed = require('./accesstoken.json');

const eraseDB = async () => {
  await AccessToken.deleteMany({});
  await Calendly.deleteMany({});
  await Course.deleteMany({});
  await EmailTemplate.deleteMany({});
  await Meeting.deleteMany({});
  await Student.deleteMany({});
  await Tutor.deleteMany({});
};

const createTutor = async (seed) => {
  const { _id } = await Tutor.create(seed);
  return _id;
};

const createCourse = async ({ seed, tutorId }) => {
  const { _id } = await Course.create(seed);
  await Tutor.findByIdAndUpdate(tutorId, { $addToSet: { courses: _id } });
  return _id;
};

const createStudents = async ({ seed, courseId }) => {
  const students = await Promise.all(seed.map(async (student) => {
    const { _id } = await Student.create(student);
    return _id;
  }));
  await Course.findByIdAndUpdate(courseId, { $addToSet: { students } });
  return students;
};

const getRandomStudent = (arr) => arr[Math.floor(Math.random() * arr.length)];

const createMeetings = async ({ seed, courseId, studentIds }) => {
  const meetings = await Promise.all(seed.map(async (meeting) => {
    const { _id } = await Meeting.create({
      ...meeting,
      studentId: getRandomStudent(studentIds),
    });
    return _id;
  }));
  await Course.findByIdAndUpdate(courseId, { $addToSet: { meetings } });
};

const createEmailTemplates = async ({ seed, authorId }) => {
  await EmailTemplate.create({ ...seed, authorId });
};

db.once('open', async () => {
  console.log('==> start db seeds');

  await eraseDB();
  const tutorId = await createTutor(demo);
  const courseId = await createCourse({ seed: courseSeed, tutorId });
  const studentIds = await createStudents({ seed: studentSeeds, courseId });
  await createMeetings({ seed: meetingSeeds, courseId, studentIds });
  await createEmailTemplates({ seed: emailTemplateSeed, authorId: tutorId });

  const myId = await createTutor(me);
  const myCourseId = await createCourse({ seed: courseSeed, tutorId: myId });
  await createMeetings({ seed: meetingSeeds, courseId, studentIds });
  const { _id: tokenId } = await AccessToken.create(tokenSeed);
  await Course.findByIdAndUpdate(myCourseId, { 'calendly.accessToken': tokenId });

  console.log('==> db seeds success\n');
  process.exit(0);
});
