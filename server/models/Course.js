const { Schema, model } = require('mongoose');
const { getISOCurrentDateStamp } = require('../utils/dateTime');

const courseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  tutorId: {
    type: Schema.Types.ObjectId,
    ref: 'Tutor',
    required: true,
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
});

const Course = model('Course', courseSchema);

module.exports = Course;
