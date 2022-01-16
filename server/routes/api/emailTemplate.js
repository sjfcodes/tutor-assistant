const router = require('express').Router();
const { EmailTemplate } = require('../../models');
const { authorizeToken } = require('../../utils/auth');
const { addModelToTutor } = require('../../utils/helpers');
const demoEmailTemplate = require('../../seed/emailTemplate.json');

router.get('/', authorizeToken, async (req, res) => {
  try {
    const templates = await EmailTemplate.find({ authorId: req.tutor._id });
    if (!templates.length) {
      // send demo template
      return res.json({ ...demoEmailTemplate, authorId: req._id });
    }

    return res.json(templates);
  } catch ({ message }) {
    console.error(message);
    return res.status(500).json({ location: 1, message });
  }
});

router.post('/', authorizeToken, async (req, res) => {
  try {
    const { _id } = await EmailTemplate.create(req.body);
    if (!_id) return res.statusMessage(500).json('failed to create template');
    await addModelToTutor(req.tutor._id, 'emailTemplates', _id);
    return res.json({ _id });
  } catch ({ message }) {
    console.error(message);
    return res.status(500).json({ location: 1, message });
  }
});

// update a templates information
router.put('/', authorizeToken, async (req, res) => {
  try {
    const template = await EmailTemplate.findByIdAndUpdate(req.body._id, req.body);
    if (!template) return res.status(404).json('template not found');

    return res.json('template updated');
  } catch ({ message }) {
    console.error(message);
    return res.status(500).json({ location: 1, message });
  }
});

// delete a template and remove the reference from the tutor
router.delete('/:_id', authorizeToken, async (req, res) => {
  try {
    const deleted = await EmailTemplate.findByIdAndDelete(req.params._id);
    if (!deleted) return res.status(404).json('template not found');
    return res.json('success');
  } catch ({ message }) {
    console.error(message);
    return res.status(500).json({ location: 1, message });
  }
});

module.exports = router;
