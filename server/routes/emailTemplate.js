const router = require('express').Router();
const { EmailTemplate } = require('../models');
const { authorizeToken } = require('../utils/auth');
const { reportError } = require('../utils/consoleColors/index.js');
const { addModelToTutor } = require('../utils/helpers');

// CREATE EMAIL TEMPLATE
router.post('/', authorizeToken, async (req, res) => {
  try {
    const object = {
      ...req.body,
      authorId: req.tutor._id,
    };
    console.log(object);
    const template = await EmailTemplate.create(object);
    console.log(template);
    if (!template._id) return res.statusMessage(500).json({ message: 'failed to create template' });
    await addModelToTutor(req.tutor._id, 'emailTemplates', template._id);
    return res.json(template);
  } catch ({ message }) {
    reportError(message);
    return res.status(500).json({ location: 1, message });
  }
});

//  FIND ALL TEMPLATES BY TUTOR ID
router.get('/', authorizeToken, async (req, res) => {
  try {
    const templates = await EmailTemplate.find({ authorId: req.tutor._id });
    if (!templates.length) {
      // send demo template
      return res.json('no templates available');
    }

    return res.json(templates);
  } catch ({ message }) {
    reportError(message);
    return res.status(500).json({ location: 1, message });
  }
});

// FIND ONE TEMPLATE BY TUTOR ID & TEMPLATE ID
router.get('/:templateId', authorizeToken, async ({
  params: { templateId },
  tutor: { _id },
}, res) => {
  try {
    const template = await EmailTemplate.findOne(
      { _id: templateId, authorId: _id },
    ).select('body name propertiesFor subject createdAt');

    const response = {
      template,
      saveTemplateTo: `${process.env.SERVER_ADDRESS}/api/email-template/${templateId}`,
      returnUserTo: process.env.CLIENT_ADDRESS,
    };
    return res.json(response);
  } catch ({ message }) {
    reportError(message);
    return res.status(500).json({ location: 1, message });
  }
});

// UPDATE TEMPLATE BY ID
router.put('/:_id', authorizeToken, async ({
  body,
  params: { _id },
}, res) => {
  try {
    const result = await EmailTemplate.findByIdAndUpdate(_id, body, { new: true });
    if (!result) return res.status(404).json({ message: 'template not found' });

    return res.json(result);
  } catch ({ message }) {
    reportError(message);
    return res.status(500).json({ location: 1, message });
  }
});

// DELETE TEMPLATE BY ID, REMOVE TEMPLATE ID FROM TUTOR
router.delete('/:_id', authorizeToken, async ({ params: { _id } }, res) => {
  try {
    const deleted = await EmailTemplate.findByIdAndDelete(_id);
    if (!deleted) return res.status(404).json({ message: 'template not found' });
    return res.json('success');
  } catch ({ message }) {
    reportError(message);
    return res.status(500).json({ location: 1, message });
  }
});

module.exports = router;
