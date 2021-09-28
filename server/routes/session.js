const router = require('express').Router()
const { Session } = require('../models');
const { authorizeToken } = require('../utils/auth');
const { addModelToTutor } = require('../utils/helpers');


router.post('/', async (req, res) => {
    const { tutor } = authorizeToken(req);
    if (!tutor) return res.status(401).json('unauthorized');

    const session = await Session.create(req.body);
    if (!session) return res.statusMessage(500).json('failed to create session');

    try {
        await addModelToTutor(tutor._id, 'sessions', session._id)
        res.json('session added');

    } catch (error) {
        console.log(error)
        res.status(500).json('failed to update tutor')
    }
})

router.put('./session/:id', async (req, res) => {
    const { tutor } = authorizeToken(req);
    if (!tutor) return res.status(401).json('unauthorized');

    const updated = await Session.findOneAndUpdate(req.params.id, req.body)
    if (!updated) res.status(500).json('failed to update')

    res.json('session updated')

})

router.delete('/session/:id', async (req, res) => {
    const { tutor } = authorizeToken(req);
    if (!tutor) return res.status(401).json('unauthorized');

    const deleted = await Session.findOneAndDelete(req.params.id)
    if (!deleted) res.status(500).json('failed to delete')

    res.json('session deleted')
})

module.exports = router