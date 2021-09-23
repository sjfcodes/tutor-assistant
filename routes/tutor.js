const router = require("express").Router();
const { Tutor, Student } = require("../models");
const { signToken, authorizeTutor } = require('../utils/auth');


router.post("/", async ({ body }, res) => {
    const tutor = await Tutor.create(body);
    const token = signToken(tutor);
    res.json({ token, tutor });
});

router.post("/login", async ({ body }, res) => {
    const tutor = await Tutor.findOne({ email: body.email });
    if (!tutor) return res.status(401).json('No tutor found with this email address');

    const correctPw = await tutor.isCorrectPassword(body.password);
    if (!correctPw) return res.status(401).json('Incorrect credentials');

    const token = signToken(tutor);
    res.json({ token, tutor });
});

router.post("/student", async (req, res) => {
    const { tutor } = authorizeTutor(req)
    if (!tutor) return res.status(401).json('unauthorized')

    const student = await Student.create(req.body);
    if (!student) return res.status(500).json('failed to create student')

    const updatedTutor = await Tutor.findOneAndUpdate({ _id: tutor._id }, { $addToSet: { students: student._id } });
    if (!updatedTutor) return res.status(500).json('failed to add student to tutor');

    res.json('student added')
})

// router.get('/student/:id',)

module.exports = router;