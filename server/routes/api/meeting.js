const router = require('express').Router();
const { Meeting } = require('../../models');
const { authorizeToken } = require('../../utils/auth');
const { deleteModelFromTutor, addModelToCourse } = require('../../utils/helpers');

// create a meeting
router.post('/:tutorId', authorizeToken, async (req, res) => {
  try {
    const { _id, createdAt } = await Meeting.create(req.body);
    if (!_id) return res.statusMessage(500).json('failed to create meeting');

    await addModelToCourse(req.params.tutorId, 'meetings', _id);
    return res.json({ _id, createdAt });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      location: 1,
      message: error.message,
    });
  }
});

// update a meetings information
router.put('/', authorizeToken, async (req, res) => {
  try {
    const meeting = await Meeting.findByIdAndUpdate(req.body._id, req.body);
    if (!meeting) return res.status(404).json('meeting not found');
    return res.json('meeting updated');
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      location: 1,
      message: error.message,
    });
  }
});

// delete a meeting and remove the reference from the tutor
router.delete('/', authorizeToken, async (req, res) => {
  try {
    await deleteModelFromTutor(req.tutor._id, 'meetings', Meeting, req.body._id);
    return res.json('meeting deleted');
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      location: 1,
      message: error.message,
    });
  }
});

module.exports = router;
