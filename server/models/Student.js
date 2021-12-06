const { Schema, model } = require('mongoose');
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
  classId: {
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
  meetingsPerWeek: {
    type: Number,
    default: 1
  },
  reassignment: {
    type: Boolean,
    required: true
  },
  temporary: {
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
  if (!this.meetingsPerWeek) {
    this.meetingsPerWeek = this.fullTimeCourse ? 2 : 1
  }
  next();
});

const Student = model('Student', studentSchema);

module.exports = Student;
