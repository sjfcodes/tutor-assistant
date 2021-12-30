const router = require('express').Router();
const { EmailTemplate } = require('../../models');
const { authorizeToken } = require('../../utils/auth');
const { addModelToTutor } = require('../../utils/helpers');

router.get('/', authorizeToken, async (req, res) => {
  try {
    const templates = await EmailTemplate.find({ authorId: req.tutor._id });
    if (!templates.length) {
      // seeded demo template id is "61bc0f049a7e2491c818fc0a"
      const demoTemplate = await EmailTemplate.findById('61bc0f049a7e2491c818fc0a');
      // send demo template with
      return res.json({ ...demoTemplate, authorId: req._id });
    }

    return res.json(templates);
  } catch (error) {
    return res.status(500).json({
      location: 1,
      message: error.message,
    });
  }
});

router.post('/', authorizeToken, async (req, res) => {
  try {
    const template = await EmailTemplate.create(req.body);
    if (!template) return res.statusMessage(500).json('failed to create template');
    await addModelToTutor(req._id, 'emailTemplates', template._id);
    return res.json({ _id: template._id });
  } catch (error) {
    return res.status(500).json({
      location: 1,
      message: error.message,
    });
  }
});

// update a templates information
router.put('/', authorizeToken, async (req, res) => {
  try {
    const template = await EmailTemplate.findByIdAndUpdate(req.body._id, req.body);
    if (!template) return res.status(404).json('template not found');

    return res.json('template updated');
  } catch (error) {
    return res.status(500).json({
      location: 1,
      message: error.message,
    });
  }
});

// // delete a template and remove the reference from the tutor
// router.delete('/', authorizeToken, async (req, res) => {
//   try {
//     await EmailTemplate.findByIdAndDelete(req.body._id);
//     const deleted = deleteModelFromTutor(req.tutor._id, 'emailTemplates', req.body._id);
//     console.log(deleted);
//     if (!deleted) return res.status(404).json('template not deleted');
//     return res.json('template deleted');
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//   location: 4,
//   message: error.message,
// });
//   }
// });

module.exports = router;
