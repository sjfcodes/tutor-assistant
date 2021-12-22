const router = require('express').Router();
const { Course } = require('../../models');
const { authorizeToken } = require('../../utils/auth');
const { addModelToTutor, deleteModelFromTutor } = require('../../utils/helpers');

// create a course
router.post('/', authorizeToken, async (req, res) => {
  const course = await Course.create(req.body);
  if (!course) return res.statusMessage(500).json('failed to create course');

  try {
    await addModelToTutor(req.tutor._id, 'courses', course._id);
    return res.json(course);
  } catch (error) {
    console.error(error);
    return res.status(500).json('failed to update tutor');
  }
});

// update a course information by id
router.put('/', authorizeToken, async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.body._id, { name: req.body.name });
    if (!course) return res.status(404).json('course not found');

    return res.json('course updated');
  } catch (error) {
    console.error(error);
    return res.status(500).json('failed to update course');
  }
});

// delete a course and remove the reference from the tutor
router.delete('/:id', authorizeToken, async (req, res) => {
  try {
    await deleteModelFromTutor(req.tutor._id, 'courses', Course, req.params.id);
    return res.json('course deleted');
  } catch (error) {
    console.error(error);
    return res.status(500).json('failed to delete course');
  }
});

module.exports = router;
