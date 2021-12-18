const router = require('express').Router();
const { Course } = require('../../models');
const { authorizeToken } = require('../../utils/auth');
const { addModelToTutor, deleteModelFromTutor } = require('../../utils/helpers');

// create a course
router.post('/', async (req, res) => {
  const { tutor } = authorizeToken(req);
  if (!tutor) return res.status(401).json('unauthorized');

  const course = await Course.create(req.body);
  if (!course) return res.statusMessage(500).json('failed to create course');

  try {
    await addModelToTutor(tutor._id, 'courses', course._id);
    // respond with new course data
    res.json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json('failed to update tutor');
  }
  return '';
});

// update a course information by id
router.put('/', async (req, res) => {
  const { tutor } = authorizeToken(req);
  if (!tutor) return res.status(401).json('unauthorized');

  try {
    const course = await Course.findByIdAndUpdate(req.body._id, { name: req.body.name });
    if (!course) return res.status(404).json('course not found');

    res.json('course updated');
  } catch (error) {
    console.error(error);
    res.status(500).json('failed to update course');
  }
  return '';
});

// delete a course and remove the reference from the tutor
router.delete('/:id', async (req, res) => {
  const { tutor } = authorizeToken(req);
  if (!tutor) return res.status(401).json('unauthorized');

  try {
    await deleteModelFromTutor(tutor._id, 'courses', Course, req.params.id);
    res.json('course deleted');
  } catch (error) {
    console.error(error);
    res.status(500).json('failed to delete course');
  }
  return '';
});

module.exports = router;
