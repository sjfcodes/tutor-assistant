const { Schema, model } = require('mongoose');

const calendlySchema = new Schema({
  avatar_url: String,
  created_at: String,
  current_organization: String,
  email: String,
  name: String,
  scheduling_url: String,
  slug: String,
  timezone: String,
  updated_at: String,
  uri: String,
});

const Calendly = model('Calendly', calendlySchema);

module.exports = Calendly;
