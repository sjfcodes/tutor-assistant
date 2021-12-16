const { Schema, model } = require('mongoose');

const courseSchema = new Schema({
  tutor_id: {
    type: Schema.Types.ObjectId,
    ref: 'Tutor',
    required: true,
  },
  name: {
    type: String,
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
    type: Number,
    default: () => Math.floor(new Date().getTime() / 1000), // unix timestamp https://www.epochconverter.com/
    // get: (timestamp) => dateFormat(timestamp),
  },
});

const Course = model('Course', courseSchema);

module.exports = Course;
