const router = require('express').Router()
const { Session } = require('../models')


router.post('/session', async (req, res) => {
    const { tutor } = authorizeToken(req);
    if (!tutor) return res.status(401).json('unauthorized');

    const session = await Session.create(req.body);
    if (!session) return res.statusMessage(500).json('failed to create session');

    const updatedTutor = await Tutor.findOneAndUpdate({ _id: tutor._id }, { $addToSet: { sessions: session._id } });
    if (!updatedTutor) return res.status(500).json('failed to add student to tutor');

    res.json('session added');
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