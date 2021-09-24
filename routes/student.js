const router = require("express").Router();
const { Student, Tutor } = require('../models')
const { signToken, authorizeTutor } = require('../utils/auth');


router.post("/", async (req, res) => {
    const { tutor } = authorizeTutor(req);
    if (!tutor) return res.status(401).json('unauthorized');

    const student = await Student.create(req.body);
    if (!student) return res.status(500).json('failed to create student');

    const updatedTutor = await Tutor.findOneAndUpdate({ _id: tutor._id }, { $addToSet: { students: student._id } });
    if (!updatedTutor) return res.status(500).json('failed to add student to tutor');

    res.json('student added');
})
router.put('')

module.exports = router