const AccessToken = require('./AccessToken');
const Course = require('./Course');
const EmailTemplate = require('./EmailTemplate');
const Meeting = require('./Meeting');
const Student = require('./Student');
const Tutor = require('./Tutor');
const Calendly = require('./Calendly');

// Tutor.find({}).then((data) => console.log(data));

module.exports = {
  AccessToken,
  Course,
  EmailTemplate,
  Meeting,
  Student,
  Tutor,
  Calendly,
};
