const router = require("express").Router();
const { Tutor, Student, Session } = require("../models");
const { signToken, authorizeToken } = require('../utils/auth');



// create a new tutor
router.post("/", async ({ body }, res) => {
    try {
        const tutor = await Tutor.create(body);
        tutor.password = null
        const token = signToken(tutor);
        res.json({ token, tutor });
    } catch (error) {
        res.status(500).json(error.message)
    }
});

// login tutor with email and password
router.post("/login", async ({ body }, res) => {
    const tutor = await Tutor.findOne({ email: body.email })
        .populate('students')
        .populate('sessions');
    if (!tutor) return res.status(401).json('Incorrect credentials');
    const correctPw = await tutor.isCorrectPassword(body.password);
    if (!correctPw) return res.status(401).json('Incorrect credentials');
    tutor.password = null

    const token = signToken(tutor);
    res.json({ token, tutor });
});

// login tutor with token
router.get('/', async (req, res) => {
    const authorized = authorizeToken(req);
    if (!authorized.tutor) return res.status(401).json('unauthorized');
    const tutor = await Tutor.findById(authorized.tutor._id)
        .populate('students')
        .populate('sessions');
    if (!tutor) return res.status(401).json('Incorrect credentials');
    tutor.password = null

    const token = signToken(tutor);
    res.json({ token, tutor });
});

// allow a tutor to update their personal data
router.put('/', async (req, res) => {
    const { tutor } = authorizeToken(req);
    if (!tutor) return res.status(401).json('unauthorized');
    const tutorDoc = await Tutor.findById(tutor._id)

    // only allow certain values to update
    const updateThis = {
        firstName: true,
        lasName: true,
        email: true,
        timeZone: true,
        gitHubUsername: true,
        calendlyLink: true,
        sessionCount: true,
        password: false,
        courses: false,
        students: false,
        sessions: false,
        createdAt: false,
    }
    for (const [key, value] of Object.entries(req.body)) {
        if (updateThis[key]) tutorDoc[key] = value
    }
    // save the updated document using the .save() method
    // https://mongoosejs.com/docs/documents.html#updating-using-queries
    const updated = await tutorDoc.save()

    if (!updated) return res.status(500).json('failed to update')
    res.json('tutor updated')
})


// future route to update password
// router.put('/password', async (req, res) => {
//     const authorized = authorizeToken(req);
//     if (!authorized.tutor) return res.status(401).json('unauthorized');

//     const tutor = await Tutor.findById(authorized.tutor._id)


//     const updated = await tutor.save()

//     if (!updated) res.status(500).json('failed to update')

//     res.json('password updated')
// })

// // delete tutor
// router.delete('/', async (req, res) => {

// })




router.post('/session', async (req, res) => {
    const { tutor } = authorizeToken(req);
    if (!tutor) return res.status(401).json('unauthorized');

    const session = await Session.create(req.body);
    if (!session) return res.statusMessage(500).json('failed to create session');

    const updatedTutor = await Tutor.findOneAndUpdate({ _id: tutor._id }, { $addToSet: { sessions: session._id } });
    if (!updatedTutor) return res.status(500).json('failed to add student to tutor');

    res.json('session added');
})




module.exports = router;