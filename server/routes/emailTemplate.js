const router = require('express').Router();
const { EmailTemplate } = require('../models');
const { authorizeToken } = require('../utils/auth');
const { reportError } = require('../utils/consoleColors/index.js');

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
router.get('/:id', authorizeToken, async (req, res) => {
  try {
    const template = await EmailTemplate.findOne(
      {
        authorId: req.tutor._id,
        _id: req.params.id,
      },
    ).select('body name includePropertiesFor subject createdAt');

    const response = {
      template,
      saveTemplateTo: `${process.env.SERVER_ADDRESS}/api/email-template/${req.params.id}`,
      returnUserTo: process.env.CLIENT_ADDRESS,
    };
    return res.json(response);
  } catch ({ message }) {
    reportError(message);
    return res.status(500).json({ location: 1, message });
  }
});

router.put('/:id', authorizeToken, async (req, res) => {
  try {
    const result = await EmailTemplate.findByIdAndUpdate(
      req.params.id,
      req.body.template,
      { new: true },
    );

    return res.json(result);
  } catch ({ message }) {
    reportError(message);
    return res.status(500).json({ location: 1, message });
  }
});

// create email tempalte
router.post('/', authorizeToken, async (req, res) => {
  try {
    const object = {
      ...req.body,
      authorId: req.tutor._id,
    };
    const template = await EmailTemplate.create(object);
    // if (!_id) return res.statusMessage(500).json({ message: 'failed to create template' });
    // await addModelToTutor(req.tutor._id, 'emailTemplates', _id);
    return res.json(template);
  } catch ({ message }) {
    reportError(message);
    return res.status(500).json({ location: 1, message });
  }
});

// update a templates information
router.put('/:id', authorizeToken, async (req, res) => {
  try {
    const template = await EmailTemplate.findByIdAndUpdate(req.params._id, req.body);
    if (!template) return res.status(404).json({ message: 'template not found' });

    return res.json('template updated');
  } catch ({ message }) {
    reportError(message);
    return res.status(500).json({ location: 1, message });
  }
});

// delete a template and remove the reference from the tutor
router.delete('/:_id', authorizeToken, async (req, res) => {
  try {
    const deleted = await EmailTemplate.findByIdAndDelete(req.params._id);
    if (!deleted) return res.status(404).json({ message: 'template not found' });
    return res.json('success');
  } catch ({ message }) {
    reportError(message);
    return res.status(500).json({ location: 1, message });
  }
});

module.exports = router;
