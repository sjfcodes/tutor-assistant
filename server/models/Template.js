const { Schema, model } = require('mongoose');

const templateSchema = new Schema({
  author_id: {
    type: Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  /**
   * templateFor option ideas
   *
   * new-student, reassignment, one-time-stand-in,
   * meeting-confirmation, time-card-correction
   *  */
  templateFor: {
    type: String,
    default: 'new-student',
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

const Template = model('Template', templateSchema);

module.exports = Template;
