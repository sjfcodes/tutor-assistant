const db = require('../config/connection');
const { Template } = require('../models');
const templateSeeds = require('./templateSeeds.json');

db.once('open', async () => {
  try {
    await Template.deleteMany({});
    await Template.create(templateSeeds);
  } catch (error) {
    console.error(error);
  }
  process.exit(0);
});
