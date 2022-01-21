const router = require('express').Router();
const { Student } = require('../../models');
const { authorizeToken } = require('../../utils/auth');
const { reportError } = require('../../utils/consoleColors');
const { addModelToCourse, deleteModelFromCourse } = require('../../utils/helpers');

// create new student and add to the course they belong to
router.post('/:courseId', authorizeToken, async (req, res) => {
  let studentId;
  try {
    const { _id, createdAt } = await Student.create(req.body);
    if (!_id) return res.status(500).json('failed to create student');
    studentId = _id;
    await addModelToCourse(req.params.courseId, 'students', _id);
    return res.json({ _id, createdAt });
  } catch ({ message }) {
    reportError(message);
    await Student.findByIdAndDelete(studentId);
    return res.status(500).json({ location: 1, message });
  }
});

// update a students information
router.put('/', authorizeToken, async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.body._id, req.body, { new: true });
    if (!student) return res.status(404).json('student not found');
    return res.json(student);
  } catch ({ message }) {
    reportError(message);
    return res.status(500).json({ location: 1, message });
  }
});

// delete a student and remove the reference from the tutor
router.delete('/', authorizeToken, async (req, res) => {
  try {
    await deleteModelFromCourse(req.tutor._id, 'students', Student, req.body._id);
    return res.json('student deleted');
  } catch ({ message }) {
    reportError(message);
    return res.status(500).json({ location: 1, message });
  }
});

module.exports = router;
