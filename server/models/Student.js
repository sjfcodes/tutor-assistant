const { Schema, model } = require('mongoose');
const { getISOCurrentDateStamp } = require('../utils/dateTime');

const studentSchema = new Schema({
  classId: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: String,
    default: () => getISOCurrentDateStamp(),
    // get: (timestamp) => dateFormat(timestamp),
  },
  email: {
    type: String,
    required: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  fullTimeCourse: {
    type: Boolean,
    required: true,
  },
  githubUsername: {
    type: String,
  },
  graduationDate: {
    type: String, // ISO 8601
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  meetingLink: {
    type: String,
  },
  meetingsPerWeek: {
    type: Number,
    default: 1,
  },
  notes: {
    type: String,
  },
  reassignment: {
    type: Boolean,
    required: true,
  },
  recurringMeeting: {
    type: Boolean,
    required: true,
  },
  timeZoneName: {
    type: String,
    required: true,
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
