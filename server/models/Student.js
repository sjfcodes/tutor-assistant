const { Schema, model } = require('mongoose');
const { getISOCurrentDateStamp } = require('../utils/dateTime');

const studentSchema = new Schema(
  {
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
    timeZoneName: {
      type: String,
    },
    meetingLink: {
      type: String,
    },
    classId: {
      type: String,
      trim: true,
    },
    graduationDate: {
      type: String, // ISO 8601
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
    notes: {
      type: String,
    },
    createdAt: {
      type: String,
      default: () => getISOCurrentDateStamp(),
    // get: (timestamp) => dateFormat(timestamp),
    },
  },
  {
    virtuals: true,
  },
);

// eslint-disable-next-line func-names
studentSchema.pre('save', async function (next) {
  if (!this.meetingsPerWeek) {
    this.meetingsPerWeek = this.fullTimeCourse ? 2 : 1;
  }
  next();
});

// eslint-disable-next-line func-names
// eslint-disable-next-line prefer-arrow-callback
studentSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});
// eslint-disable-next-line func-names
// eslint-disable-next-line prefer-arrow-callback
studentSchema.virtual('clockOutNotes').get(function () {
  return `1. ${this.classId}
2. ${this.firstName} ${this.lastName}
3. B2B-No`;
});
// eslint-disable-next-line func-names
// eslint-disable-next-line prefer-arrow-callback
studentSchema.virtual('sessionReview').get(function () {
  return `${'`session review`'}
classCode: ${this.classId}
https://docs.google.com/forms/d/e/1FAIpQLSdb4ejjbqoqKO-Q4k7zeO_xwykwB0dxYLWYm1mX5Ik45MzEeg/viewform`;
});

const Student = model('Student', studentSchema);

module.exports = Student;
