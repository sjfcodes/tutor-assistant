const db = require('../config/connection');
const {
  Tutor, EmailTemplate, Course, Student, Meeting,
} = require('../models');
const emailTemplateSeeds = require('./emailTemplateSeeds.json');
const tutorSeeds = require('./tutorSeeds.json');

/**
 * hash for 'password'
 * $2b$10$BQjgtZGdeDL1yxU3sJSNzucXFHETbx8dEQdRbuvVFih4eeRk7Cg3q
 */

db.once('open', async () => {
  try {
    await Tutor.deleteMany({});
    await EmailTemplate.deleteMany({});
    await Course.deleteMany({});
    await Student.deleteMany({});
    await Meeting.deleteMany({});

    const tutorArr = await Tutor.create(tutorSeeds);

    const formattedTemplates = emailTemplateSeeds
      .map((template) => (
        {
          tutorId: tutorArr[0]._id,
          ...template,
        }
      ));

    const emailTemplate = await EmailTemplate.create(formattedTemplates);

    await Tutor.findByIdAndUpdate(
      tutorArr[0]._id,
      {
        $addToSet: { emailTemplates: emailTemplate[0]._id },
      },
    );
  } catch (error) {
    console.error(error);
  }
  process.exit(0);
});
