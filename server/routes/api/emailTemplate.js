const router = require('express').Router();
const { EmailTemplate } = require('../../models');
const { authorizeToken } = require('../../utils/auth');
// eslint-disable-next-line no-unused-vars
const { addModelToTutor } = require('../../utils/helpers');

router.get('/', async (req, res) => {
  const { tutor } = authorizeToken(req);
  try {
    if (!tutor) return res.status(401).json('unauthorized');

    const templates = await EmailTemplate.find({ tutorId: tutor._id });
    if (!templates.length) {
      // seeded demo template id is "61bc0f049a7e2491c818fc0a"
      const demoTemplate = await EmailTemplate.findById('61bc0f049a7e2491c818fc0a');
      demoTemplate.tutorId = tutor._id;
      return res.json(demoTemplate);
    }

    res.json(templates);
  } catch (error) {
    console.error(error);
    res.status(500).json('error');
  }
  return '';
});

router.post('/', async (req, res) => {
  const { tutor } = authorizeToken(req);
  try {
    if (!tutor) return res.status(401).json('unauthorized');

    const template = await EmailTemplate.create(req.body);
    if (!template) return res.statusMessage(500).json('failed to create template');
    await addModelToTutor(tutor._id, 'emailTemplates', template._id);
    res.json(template);
  } catch (error) {
    console.error(error);
    res.status(500).json('error');
  }
  return '';
});

// update a templates information
router.put('/', async (req, res) => {
  const { tutor } = authorizeToken(req);
  try {
    if (!tutor) return res.status(401).json('unauthorized');

    const template = await EmailTemplate.findByIdAndUpdate(req.body._id, req.body);
    if (!template) return res.status(404).json('template not found');

    res.json('template updated');
  } catch (error) {
    console.error(error);
    res.status(500).json('error');
  }
  return '';
});

// delete a template and remove the reference from the tutor
router.delete('/', async (req, res) => {
  const { tutor } = authorizeToken(req);
  try {
    if (!tutor) return res.status(401).json('unauthorized');

    await EmailTemplate.findByIdAndDelete(req.body._id);

    res.json('template deleted');
  } catch (error) {
    console.error(error);
    res.status(500).json('error');
  }
  return '';
});

module.exports = router;
