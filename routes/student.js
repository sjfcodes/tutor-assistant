const router = require("express").Router();
const { Student, Tutor } = require('../models')
const { authorizeToken } = require('../utils/auth');
const { addStudentToTutor } = require("../utils/helpers");

// create new student and add to the tutor who created the document 
router.post("/", async (req, res) => {
    const { tutor } = authorizeToken(req);
    if (!tutor) return res.status(401).json('unauthorized');

    const student = await Student.create(req.body);
    if (!student) return res.status(500).json('failed to create student');

    try {
        await addStudentToTutor(tutor._id, student)

        res.json({ student });

    } catch (error) {
        console.log(error)
        await Student.findByIdAndDelete(student._id)
        res.status(500).json('failed to add student to tutor')
    }

})
router.put('')

module.exports = router