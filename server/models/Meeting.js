const { Schema, model } = require('mongoose');
const { getISOCurrentDateStamp } = require('../utils/dateTime');

const meetingSchema = new Schema({
  status: {
    type: String,
    required: true,
  },
  studentId: {
    type: Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  duration: {
    type: Number,
    default: 1,
  },
  startDate: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
  createdAt: {
    type: String,
    default: () => getISOCurrentDateStamp(),
  },
});

const Meeting = model('Meeting', meetingSchema);

module.exports = Meeting;
