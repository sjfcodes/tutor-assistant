const router = require('express').Router()
const { Session } = require('../models');
const { authorizeToken } = require('../utils/auth');
const { addModelToTutor, deleteModelFromTutor } = require('../utils/helpers');


router.post('/', async (req, res) => {
    const { tutor } = authorizeToken(req);
    if (!tutor) return res.status(401).json('unauthorized');

    const session = await Session.create(req.body);
    if (!session) return res.statusMessage(500).json('failed to create session');

    try {
        await addModelToTutor(tutor._id, 'sessions', session._id);
        res.json('session added');

    } catch (error) {
        console.log(error);
        res.status(500).json('failed to update tutor');
    };
});

// update a sessions information
router.put('/', async (req, res) => {
    const { tutor } = authorizeToken(req);
    if (!tutor) return res.status(401).json('unauthorized');

    try {
        const session = await Session.findByIdAndUpdate(req.body._id, req.body);
        if (!session) return res.status(404).json('session not found');

        res.json('session updated');

    } catch (error) {
        console.log(error);
        res.status(500).json('failed to update session');
    };
});

// delete a session and remove the reference from the tutor
router.delete('/', async (req, res) => {
    const { tutor } = authorizeToken(req);
    if (!tutor) return res.status(401).json('unauthorized');

    try {
        await deleteModelFromTutor(tutor._id, "sessions", Session, req.body._id);
        res.json('session deleted');

    } catch (error) {
        console.log(error);
        res.status(500).json('failed to delete session');
    };

});

module.exports = router