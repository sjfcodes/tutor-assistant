const { Schema, model } = require('mongoose');
const { getISOCurrentDateStamp } = require('../utils/dateTime');

const courseSchema = new Schema(
  {
    calendly: {
      accessToken: {
        type: Schema.Types.ObjectId,
        default: null,
      },
      data: {
        type: Schema.Types.ObjectId,
        ref: 'Calendly',
        default: null,
      },
    },
    createdAt: {
      type: String,
      default: () => getISOCurrentDateStamp(),
    },
    meetings: [{
      type: Schema.Types.ObjectId,
      ref: 'Meeting',
    }],
    name: {
      type: String,
      required: true,
    },
    students: [{
      type: Schema.Types.ObjectId,
      ref: 'Student',
    }],
  },
  {
    virtuals: true,
  },
);

// eslint-disable-next-line func-names
courseSchema.virtual('studentCount').get(function () {
  return this.students.length;
});
// eslint-disable-next-line func-names
courseSchema.virtual('meetingCount').get(function () {
  return this.meetings.length;
});

const Course = model('Course', courseSchema);

module.exports = Course;
