const router = require('express').Router();
const { Student } = require('../models');
const { authorizeToken } = require('../utils/auth');
const { addModelToCourse, deleteModelFromCourse } = require('../utils/helpers');

// create new student and add to the course they belong to
router.post('/:courseId', async (req, res) => {
  const { tutor } = authorizeToken(req);
  if (!tutor) return res.status(401).json('unauthorized');

  const { _id, createdAt } = await Student.create(req.body);
  if (!_id) return res.status(500).json('failed to create student');

  try {
    await addModelToCourse(req.params.courseId, 'students', _id);

    res.json({ _id, createdAt });
  } catch (error) {
    console.error(error);
    await Student.findByIdAndDelete(_id);
    res.status(500).json('failed to add student to tutor');
  }
  return '';
});

// update a students information
router.put('/', async (req, res) => {
  const { tutor } = authorizeToken(req);
  if (!tutor) return res.status(401).json('unauthorized');

  try {
    const student = await Student.findByIdAndUpdate(req.body._id, req.body);
    if (!student) return res.status(404).json('student not found');

    res.json('student updated');
  } catch (error) {
    console.error(error);
    res.status(500).json('failed to update student');
  }
  return '';
});

// delete a student and remove the reference from the tutor
router.delete('/', async (req, res) => {
  const { tutor } = authorizeToken(req);
  if (!tutor) return res.status(401).json('unauthorized');

  try {
    await deleteModelFromCourse(tutor._id, 'students', Student, req.body._id);
    res.json('student deleted');
  } catch (error) {
    console.error(error);
    res.status(500).json('failed to delete student');
  }
  return '';
});

module.exports = router;
