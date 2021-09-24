const router = require("express").Router();
const { Tutor, Student, Session } = require("../models");
const { signToken, authorizeTutor } = require('../utils/auth');


router.post("/", async ({ body }, res) => {
    const tutor = await Tutor.create(body);
    const token = signToken(tutor);
    res.json({ token, tutor });
});
router.put('/', async (req, res) => {
    const { tutor } = authorizeTutor(req);
    if (!tutor) return res.status(401).json('unauthorized');

    const tutorDoc = await Tutor.findById(tutor._id)

    // only allow certain values to update
    for (const [key, value] of Object.entries(req.body)) {
        if (key === 'password' || key === 'courses' || key === 'students' || key === 'sessions') continue
        tutorDoc[key] = value
    }

    const updated = await tutorDoc.save()

    if (!updated) res.status(500).json('failed to update')

    res.json('tutor updated')
})

// // future route to update password
// router.put('/password', async (req, res) => {
//     const { tutor } = authorizeTutor(req);
//     if (!tutor) return res.status(401).json('unauthorized');

//     const tutorDoc = await Tutor.findById(tutor._id)

//     // only allow certain values to update at this time
//     for (const [key, value] of Object.entries(req.body)) {
//         if (key === 'courses' || key === 'students' || key === 'sessions') continue
//         tutorDoc[key] = value
//     }

//     const updated = await tutorDoc.save()

//     if (!updated) res.status(500).json('failed to update')

//     res.json('password updated')
// })

// // delete tutor
// router.delete('/', async (req, res) => {

// })


router.post("/login", async ({ body }, res) => {
    const tutor = await Tutor.findOne({ email: body.email })
        .populate('students')
        .populate('sessions');
    if (!tutor) return res.status(401).json('No tutor found with this email address');

    const correctPw = await tutor.isCorrectPassword(body.password);
    if (!correctPw) return res.status(401).json('Incorrect credentials');

    const token = signToken(tutor);
    res.json({ token, tutor });
});



router.post('/session', async (req, res) => {
    const { tutor } = authorizeTutor(req);
    if (!tutor) return res.status(401).json('unauthorized');

    const session = await Session.create(req.body);
    if (!session) return res.statusMessage(500).json('failed to create session');

    const updatedTutor = await Tutor.findOneAndUpdate({ _id: tutor._id }, { $addToSet: { sessions: session._id } });
    if (!updatedTutor) return res.status(500).json('failed to add student to tutor');

    res.json('session added');
})




module.exports = router;