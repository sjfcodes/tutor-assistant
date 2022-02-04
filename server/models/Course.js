const { Schema, model } = require('mongoose');
const { getISOCurrentDateStamp } = require('../utils/dateTime');

const courseSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
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
    students: [{
      type: Schema.Types.ObjectId,
      ref: 'Student',
    }],
    meetings: [{
      type: Schema.Types.ObjectId,
      ref: 'Meeting',
    }],
    createdAt: {
      type: String,
      default: () => getISOCurrentDateStamp(),
    },
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
