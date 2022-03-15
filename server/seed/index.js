const {
  Tutor, EmailTemplate, Course,
  Student, Meeting, AccessToken,
  Calendly,
} = require('../models');
const { exitWithSuccess, reportStatus } = require('../utils/consoleColors/index.js');
const { demo, me } = require('./tutor');
const emailTemplateSeeds = require('./emailTemplate.json');

const courseSeed = require('./course.json');
const studentSeeds = require('./student');
const meetingSeeds = require('./meeting');
const tokenSeed = require('./accesstoken.json');

reportStatus('Starting DB seeds');
const db = require('../config/connection');

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
  await Course.findByIdAndUpdate(courseId, { $addToSet: { students: { $each: students } } });
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

const createEmailTemplates = async (seedsArr) => {
  await EmailTemplate.create(seedsArr);
};

db.once('open', async () => {
  await eraseDB();

  // setup demo account
  const tutorId = await createTutor(demo);
  const courseId = await createCourse({ seed: courseSeed, tutorId });
  const studentIds = await createStudents({ seed: studentSeeds, courseId });
  await createMeetings({ seed: meetingSeeds, courseId, studentIds });

  // setup personal account
  const myId = await createTutor(me);
  const myCourseId = await createCourse({ seed: courseSeed, tutorId: myId });
  // const myStudentIds = await createStudents({ seed: studentSeeds, courseId: myCourseId });
  // await createMeetings({ seed: meetingSeeds, courseId: myCourseId, studentIds: myStudentIds });
  const { _id: calendlyTokenId } = await AccessToken.create(tokenSeed[0]);
  await Course.findByIdAndUpdate(myCourseId, { 'calendly.accessToken': calendlyTokenId });
  const { _id: sendGridTokenId } = await AccessToken.create(tokenSeed[1]);
  await Tutor.findByIdAndUpdate(myId, { 'sendGrid.accessToken': sendGridTokenId });
  const emailSeeds = emailTemplateSeeds.map((template) => ({ ...template, authorId: myId }));
  await createEmailTemplates(emailSeeds);

  exitWithSuccess('Seeds Complete');
});
