const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
// const dateFormat = require('../utils/dateFormat');

const tutorSchema = new Schema({
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
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  timeZoneOffset: {
    type: String,
    required: true,
  },
  githubUsername: {
    type: String,
  },
  calendlyLink: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  courses: [{
    type: Schema.Types.ObjectId,
    ref: 'Course',
  }],
  emailTemplates: [{
    type: Schema.Types.ObjectId,
    ref: 'EmailTemplate',
  }],
  createdAt: {
    type: Number,
    default: () => Math.floor(new Date().getTime() / 1000), // unix timestamp https://www.epochconverter.com/
    // get: (timestamp) => dateFormat(timestamp),
  },
});

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
