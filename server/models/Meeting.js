const { Schema, model } = require('mongoose');

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
    type: Number,
    required: true,
  },
  createdAt: {
    type: Number,
    default: () => Math.floor(new Date().getTime() / 1000), // unix timestamp https://www.epochconverter.com/
  },
});

const Meeting = model('Meeting', meetingSchema);

module.exports = Meeting;
