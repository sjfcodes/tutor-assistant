const { Schema, Types, model } = require('mongoose');
// const dateFormat = require('../utils/dateFormat');

const studentSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  course: {
    type: String,
    required: true,
    trim: true,
  },
  classCode: {
    type: String,
    required: true,
    trim: true,
  },
  timeZone: {
    type: String
  },
  graduationDate: {
    type: Number //unix
  },
  fullTimeCourse: {
    type: Boolean
  },
  gitHubUsername: {
    type: String
  },
  zoomLink: {
    type: String,
    required: true
  },
  sessionsPerWeek: {
    type: Number,
  },
  reassignment: {
    type: Boolean,
    required: true
  },
  oneTimeStandIn: {
    type: Boolean,
    required: true
  },
  createdAt: {
    type: Number,
    default: () => Math.floor(new Date().getTime() / 1000), // unix timestamp https://www.epochconverter.com/ 
    // get: (timestamp) => dateFormat(timestamp),
  },
});

studentSchema.pre('save', async function (next) {
  if (!this.sessionsPerWeek) {
    this.sessionsPerWeek = this.fullTimeCourse ? 2 : 1
  }
  next();
});

const Student = model('Student', studentSchema);

module.exports = Student;
