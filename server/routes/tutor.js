const router = require("express").Router();
const { Tutor } = require("../models");
const { signToken, authorizeToken } = require('../utils/auth');
const { updateDocumentProperties, getTutorByEmail, getTutorById } = require("../utils/helpers");



// create a new tutor
router.post("/", async ({ body }, res) => {
    try {
        const tutor = await Tutor.create(body);
        tutor.password = null
        const token = signToken(tutor);
        res.json({ token, tutor });
    } catch (error) {
        console.log(error)
        res.status(500).json('failed to create tutor')
    }
});

// login tutor with email and password
router.post("/login", async ({ body }, res) => {
    try {
        const tutor = await getTutorByEmail(body.email)

        const correctPw = await tutor.isCorrectPassword(body.password);
        if (!correctPw) return res.status(401).json('unauthorized');

        tutor.password = null
        const token = signToken(tutor);
        res.json({ token, tutor });

    } catch (error) {
        console.log(error)
        res.status(401).json('unauthorized');
    }
});

// login tutor with token
router.get('/', async (req, res) => {
    const authorized = authorizeToken(req);
    if (!authorized.tutor) return res.status(401).json('unauthorized');

    try {
        const tutor = await getTutorById(authorized.tutor._id)
        if (!tutor) return res.status(401).json('unauthorized');
        tutor.password = null
        const token = signToken(tutor);
        res.json({ token, tutor });

    } catch (error) {
        console.log(error)
        res.status(401).json('unauthorized');
    }
});

// allow a tutor to update their personal data
router.put('/', async (req, res) => {
    const { tutor } = authorizeToken(req);
    if (!tutor) return res.status(401).json('unauthorized');
    const tutorDoc = await Tutor.findById(tutor._id)

    // config for properties allowed to update
    const allowUpdate = {
        firstName: true,
        lasName: true,
        email: true,
        timeZone: true,
        gitHubUsername: true,
        calendlyLink: true,
        meetingCount: true,
        password: false,
        courses: false,
        students: false,
        meetings: false,
        createdAt: false,
    }
    updateDocumentProperties(allowUpdate, tutorDoc, req.body)
    // save the updated document using the .save() method
    // https://mongoosejs.com/docs/documents.html#updating-using-queries
    const updated = await tutorDoc.save()

    if (!updated) return res.status(500).json('failed to update')
    res.json('tutor updated')
})

router.post('/courses', async (req, res) => {
    const authorized = authorizeToken(req);
    if (!authorized.tutor) return res.status(401).json('unauthorized');
    try {
        const updated = await Tutor.findByIdAndUpdate(
            authorized.tutor._id,
            { $addToSet: { courses: req.body.courseName } },
            { new: true }
        )
        res.json(updated.courses)

    } catch (error) {
        console.log(error)
        res.status(500).json('error')
    }
})

router.delete('/courses', async (req, res) => {
    const authorized = authorizeToken(req);
    if (!authorized.tutor) return res.status(401).json('unauthorized');
    try {
        const updated = await Tutor.findByIdAndUpdate(
            authorized.tutor._id,
            { $pull: { courses: req.body.courseName } },
            { new: true }
        )
        res.json(updated.courses)

    } catch (error) {
        console.log(error)
        res.status(500).json('error')
    }
})


// update a tutors password
router.put('/password', async (req, res) => {
    const authorized = authorizeToken(req);
    if (!authorized.tutor) return res.status(401).json('unauthorized');

    try {
        const tutor = await getTutorById(authorized.tutor._id)

        const correctPw = await tutor.isCorrectPassword(req.body.password);
        if (!correctPw) return res.status(401).json('unauthorized');

        // update password to overwrite
        tutor.password = req.body.newPassword

        const updated = await tutor.save()
        if (!updated) res.status(500).json('failed to update')

        res.json('password updated')

    } catch (error) {
        console.log(error)
        res.status(401).json('unauthorized');
    }
})

// delete tutor
router.delete('/', async (req, res) => {
    const authorized = authorizeToken(req);
    if (!authorized.tutor) return res.status(401).json('unauthorized');
    try {
        const tutor = await getTutorById(authorized.tutor._id)
        const correctPw = await tutor.isCorrectPassword(req.body.password);
        if (!correctPw) return res.status(401).json('unauthorized');

        await Tutor.findByIdAndDelete(tutor._id)

        res.json('tutor deleted')

    } catch (error) {
        console.log(error)
        res.status(401).json('unauthorized');
    }

})

module.exports = router;