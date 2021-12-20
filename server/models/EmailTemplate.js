const { Schema, model } = require('mongoose');
const { getISOCurrentDateStamp } = require('../utils/dateTime');

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
    type: String,
    default: () => getISOCurrentDateStamp(),
  },
});

const EmailTemplate = model('EmailTemplate', templateSchema);

module.exports = EmailTemplate;
