const router = require("express").Router();
const { Tutor, Student } = require("../models");
const { signToken } = require('../utils/auth');


router.post("/", async ({ body }, res) => {
    const tutor = await Tutor.create(body);
    const token = signToken(tutor);
    res.json({ token, tutor });
});

router.post("/login", async ({ body }, res) => {
    const tutor = await Tutor.findOne({ email: body.email });
    if (!tutor) return res.status(401).json('No tutor found with this email address');

    const correctPw = await Tutor.isCorrectPassword(body.password);
    if (!correctPw) return res.status(401).json('Incorrect credentials');

    const token = signToken(tutor);
    res.json({ token, tutor });
});

router.post("/student", async ({ body }, res) => {

    const student = await Student.create(body);
    if (!student) return res.status(500).json('failed to create student')

    const tutor = await Tutor.findOneAndUpdate({ _id: body.user_id }, { $addToSet: { students: student._id } });
    if (!tutor) return res.status(401).json('failed to add student to tutor');

    res.json('ok')
})

module.exports = router;