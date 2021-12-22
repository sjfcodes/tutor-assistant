const router = require('express').Router();
const { Student } = require('../../models');
const { authorizeToken } = require('../../utils/auth');
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
  } catch (error) {
    console.error(error);
    await Student.findByIdAndDelete(studentId);
    return res.status(500).json('failed to add student to tutor');
  }
});

// update a students information
router.put('/', authorizeToken, async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.body._id, req.body);
    if (!student) return res.status(404).json('student not found');
    return res.json('student updated');
  } catch (error) {
    console.error(error);
    return res.status(500).json('failed to update student');
  }
});

// delete a student and remove the reference from the tutor
router.delete('/', authorizeToken, async (req, res) => {
  try {
    await deleteModelFromCourse(req.tutor._id, 'students', Student, req.body._id);
    return res.json('student deleted');
  } catch (error) {
    console.error(error);
    return res.status(500).json('failed to delete student');
  }
});

module.exports = router;
