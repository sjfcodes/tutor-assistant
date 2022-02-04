const { Schema, model } = require('mongoose');
const { getISOCurrentDateStamp } = require('../utils/dateTime');
const { name, subject, body: { html, text } } = require('../seed/emailTemplate.json');
const { getPropertiesFor } = require('../utils/emailTemplate');
const Meeting = require('./Meeting');
const Student = require('./Student');
const Tutor = require('./Tutor');

const bodySchema = Schema({ html: String, text: String }, { _id: false });

const propertiesForSchema = new Schema({
  tutor: {
    isIncluded: { type: Boolean, default: true },
    options: { type: Object, default: null },
  },
  student: {
    isIncluded: { type: Boolean, default: true },
    options: { type: Object, default: null },
  },
  meeting: {
    isIncluded: { type: Boolean, default: false },
    options: { type: Object, default: null },
  },
}, { _id: false });

const templateSchema = new Schema({
  authorId: {
    type: Schema.Types.ObjectId,
    ref: 'Tutor',
    required: true,
  },
  body: {
    type: bodySchema,
    required: true,
    default: { html, text },
  },
  name: {
    type: String,
    required: true,
    default: name,
  },
  propertiesFor: { type: propertiesForSchema, required: true },
  subject: {
    type: String,
    requied: true,
    default: subject,
  },
  createdAt: {
    type: String,
    required: true,
    default: () => getISOCurrentDateStamp(),
  },
});

templateSchema.pre('save', async function checkPropertiesFor(next) {
  const { propertiesFor: { student, meeting, tutor } } = this;
  // if a model is included, get available properties for the model
  if (meeting.isIncluded) meeting.options = await getPropertiesFor(Meeting);
  if (student.isIncluded) student.options = await getPropertiesFor(Student);
  if (tutor.isIncluded) tutor.options = await getPropertiesFor(Tutor);
  // console.log(this.propertiesFor);
  next();
});

const EmailTemplate = model('EmailTemplate', templateSchema);

module.exports = EmailTemplate;
