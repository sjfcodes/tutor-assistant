const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
// const dateFormat = require('../utils/dateFormat');

const tutorSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  timeZone: {
    type: String,
    required: true
  },
  gitHubUsername: {
    type: String
  },
  calendlyLink: {
    type: String,
    required: true
  },
  meetingCount: {
    type: Number,
    default: 0
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  courses: [{
    type: Schema.Types.ObjectId,
    ref: 'Course'
  }],
  createdAt: {
    type: Number,
    default: () => Math.floor(new Date().getTime() / 1000), // unix timestamp https://www.epochconverter.com/ 
    // get: (timestamp) => dateFormat(timestamp),
  },
});

tutorSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

tutorSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const Tutor = model('Tutor', tutorSchema);

module.exports = Tutor;