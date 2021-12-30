const { Schema, model } = require('mongoose');
const { getISOCurrentDateStamp } = require('../utils/dateTime');

const calendlySchema = new Schema(
  {
    avatar_url: { type: String },
    created_at: { type: String },
    current_organization: { type: String },
    email: { type: String },
    name: { type: String },
    scheduling_url: { type: String },
    slug: { type: String },
    timezone: { type: String },
    updated_at: { type: String },
    uri: { type: String },
    createdAt: {
      type: String,
      default: () => getISOCurrentDateStamp(),
    },
  },
  {
    collection: 'calendly',
  },
);

const Calendly = model('Calendly', calendlySchema);

module.exports = Calendly;
