const { Schema, model } = require('mongoose');
const { getISOCurrentDateStamp } = require('../utils/dateTime');

const templateSchema = new Schema({
  authorId: {
    type: Schema.Types.ObjectId,
    ref: 'Tutor',
    required: true,
  },
  body: {
    html: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  name: {
    type: String,
    required: true,
  },
  includePropertiesFor: {
    tutor: {
      type: Boolean,
      default: true,
    },
    student: {
      type: Boolean,
      default: true,
    },
    meeting: {
      type: Boolean,
      default: false,
    },
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

templateSchema.pre('save', (next) => {
  // setting default array of properties
  this.includePropertiesFor = ['tutor', 'student'];
  next();
});

const EmailTemplate = model('EmailTemplate', templateSchema);

module.exports = EmailTemplate;
