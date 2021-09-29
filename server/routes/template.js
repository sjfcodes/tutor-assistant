const router = require('express').Router()
const { Template } = require('../models');
const { authorizeToken } = require('../utils/auth');


router.get('/', async (req, res) => {
    const { tutor } = authorizeToken(req);
    if (!tutor) return res.status(401).json('unauthorized');

    const templates = await Template.find({})
    if (!templates) return res.status(500).json('failed to find templates')

    res.json(templates)
})

router.post('/', async (req, res) => {
    const { tutor } = authorizeToken(req);
    if (!tutor) return res.status(401).json('unauthorized');

    const template = await Template.create(req.body);
    if (!template) return res.statusMessage(500).json('failed to create template');

    res.json('template added');
});

// update a sessions information
router.put('/', async (req, res) => {
    const { tutor } = authorizeToken(req);
    if (!tutor) return res.status(401).json('unauthorized');

    const template = await Template.findByIdAndUpdate(req.body._id, req.body);
    if (!template) return res.status(404).json('template not found');

    res.json('template updated');
});

// delete a template and remove the reference from the tutor
router.delete('/', async (req, res) => {
    const { tutor } = authorizeToken(req);
    if (!tutor) return res.status(401).json('unauthorized');

    await Template.findByIdAndDelete(req.body._id)

    res.json('template deleted');
});

module.exports = router