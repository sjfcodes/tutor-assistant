const router = require("express").Router();
const { Student, Tutor } = require('../models')
const { authorizeToken } = require('../utils/auth');
const { addStudentToTutor, updateDocumentProperties, deleteStudentFromTutor } = require("../utils/helpers");


// create new student and add to the tutor who created the document 
router.post("/", async (req, res) => {
    const { tutor } = authorizeToken(req);
    if (!tutor) return res.status(401).json('unauthorized');

    const student = await Student.create(req.body);
    if (!student) return res.status(500).json('failed to create student');

    try {
        await addStudentToTutor(tutor._id, student._id)

        res.json({ student });

    } catch (error) {
        console.log(error)
        await Student.findByIdAndDelete(student._id)
        res.status(500).json('failed to add student to tutor')
    }
})

// update a students information
router.put('/', async (req, res) => {
    const { tutor } = authorizeToken(req);
    if (!tutor) return res.status(401).json('unauthorized');
    try {
        const student = await Student.findByIdAndUpdate(req.body._id, req.body)
        if (!student) return res.status(404).json('student not found')

        res.json('student updated')

    } catch (error) {
        console.log(error)
        res.status(500).json('failed to update student')
    }
})

// delete a student and remove the reference from the tutor
router.delete('/', async (req, res) => {
    const { tutor } = authorizeToken(req);
    if (!tutor) return res.status(401).json('unauthorized');

    try {
        await deleteStudentFromTutor(tutor._id, req.body._id)
        res.json('student deleted')
    } catch (error) {
        console.log(error)
        res.status(500).json('failed to delete student')
    }

})

module.exports = router