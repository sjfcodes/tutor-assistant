const router = require('express').Router()
const { Meeting } = require('../models');
const { authorizeToken } = require('../utils/auth');
const { addModelToTutor, deleteModelFromTutor } = require('../utils/helpers');


router.post('/', async (req, res) => {
    const { tutor } = authorizeToken(req);
    if (!tutor) return res.status(401).json('unauthorized');

    const meeting = await Meeting.create(req.body);
    if (!meeting) return res.statusMessage(500).json('failed to create meeting');

    try {
        await addModelToTutor(tutor._id, 'meetings', meeting._id);
        res.json('meeting added');

    } catch (error) {
        console.log(error);
        res.status(500).json('failed to update tutor');
    };
});

// update a meetings information
router.put('/', async (req, res) => {
    const { tutor } = authorizeToken(req);
    if (!tutor) return res.status(401).json('unauthorized');

    try {
        const meeting = await Meeting.findByIdAndUpdate(req.body._id, req.body);
        if (!meeting) return res.status(404).json('meeting not found');

        res.json('meeting updated');

    } catch (error) {
        console.log(error);
        res.status(500).json('failed to update meeting');
    };
});

// delete a meeting and remove the reference from the tutor
router.delete('/', async (req, res) => {
    const { tutor } = authorizeToken(req);
    if (!tutor) return res.status(401).json('unauthorized');

    try {
        await deleteModelFromTutor(tutor._id, "meetings", Meeting, req.body._id);
        res.json('meeting deleted');

    } catch (error) {
        console.log(error);
        res.status(500).json('failed to delete meeting');
    };

});

module.exports = router