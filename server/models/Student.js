const { Schema, model } = require('mongoose');
// const dateFormat = require('../utils/dateFormat');

const studentSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  githubUsername: {
    type: String,
  },
  timeZoneOffset: {
    type: String,
  },
  meetingLink: {
    type: String,
    required: true,
  },
  classId: {
    type: String,
    trim: true,
  },
  graduationDate: {
    type: Number, // unix
  },
  meetingsPerWeek: {
    type: Number,
    default: 1,
  },
  fullTimeCourse: {
    type: Boolean,
    required: true,
  },
  reassignment: {
    type: Boolean,
    required: true,
  },
  recurringMeeting: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Number,
    default: () => Math.floor(new Date().getTime() / 1000), // unix timestamp https://www.epochconverter.com/
    // get: (timestamp) => dateFormat(timestamp),
  },
});

// eslint-disable-next-line func-names
studentSchema.pre('save', async function (next) {
  if (!this.meetingsPerWeek) {
    this.meetingsPerWeek = this.fullTimeCourse ? 2 : 1;
  }
  next();
});

const Student = model('Student', studentSchema);

module.exports = Student;
