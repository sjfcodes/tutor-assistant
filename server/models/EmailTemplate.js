const { Schema, model } = require('mongoose');
const { getISOCurrentDateStamp } = require('../utils/dateTime');

const templateSchema = new Schema({
  authorId: {
    type: Schema.Types.ObjectId,
    ref: 'Tutor',
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    requied: true,
  },
  createdAt: {
    type: String,
    default: () => getISOCurrentDateStamp(),
  },
});

const EmailTemplate = model('EmailTemplate', templateSchema);

module.exports = EmailTemplate;
