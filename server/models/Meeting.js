/* eslint-disable func-names */
const { Schema, model } = require('mongoose');
const { getISOCurrentDateStamp, calculateEndTime } = require('../utils/dateTime');

const meetingSchema = new Schema(
  {
    status: {
      type: String,
      required: true,
    },
    studentId: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    endTime: {
      type: String,
    },
    notes: {
      type: String,
    },
    createdAt: {
      type: String,
      default: () => getISOCurrentDateStamp(),
    },
  },
);

meetingSchema.pre('save', function (next) {
  this.set({
    endTime: calculateEndTime({
      startTime: this.startTime,
      duration: this.duration,
    }),
  });
  next();
});

const Meeting = model('Meeting', meetingSchema);

module.exports = Meeting;
