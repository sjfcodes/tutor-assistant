const { Schema, model } = require('mongoose');

const templateSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  authorId: {
    type: Schema.Types.ObjectId,
    ref: 'Tutor',
    required: true,
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
