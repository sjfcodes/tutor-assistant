const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const { getISOCurrentDateStamp } = require('../utils/dateTime');

const tutorSchema = new Schema(
  {
    courses: [{
      type: Schema.Types.ObjectId,
      ref: 'Course',
    }],
    createdAt: {
      type: String,
      default: () => getISOCurrentDateStamp(),
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must match an email address!'],
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    githubUsername: {
      type: String,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    scheduleLink: {
      type: String,
      required: true,
    },
    sendGrid: {
      accessToken: {
        type: Schema.Types.ObjectId,
        default: null,
      },
    },
    timeZoneName: {
      type: String,
      required: true,
    },
  },
);

// eslint-disable-next-line func-names
tutorSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

// eslint-disable-next-line func-names
tutorSchema.methods.isCorrectPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const Tutor = model('Tutor', tutorSchema);

module.exports = Tutor;
