const { Schema, model } = require('mongoose');

const templateSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  tutorId: {
    type: Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  templateValues: {
    type: String,
  },
  template: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Number,
    default: () => Math.floor(new Date().getTime() / 1000), // unix timestamp https://www.epochconverter.com/
  },
});

const EmailTemplate = model('EmailTemplate', templateSchema);

module.exports = EmailTemplate;
