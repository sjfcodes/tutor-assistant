const router = require('express').Router();
const { Meeting } = require('../../models');
const { authorizeToken } = require('../../utils/auth');
const { calculateEndTime } = require('../../utils/dateTime');
const { deleteModelFromTutor, addModelToCourse } = require('../../utils/helpers');

// create a meeting
router.post('/:tutorId', authorizeToken, async (req, res) => {
  try {
    const { _id, createdAt } = await Meeting.create(req.body);
    if (!_id) return res.statusMessage(500).json('failed to create meeting');

    await addModelToCourse(req.params.tutorId, 'meetings', _id);
    return res.json({ _id, createdAt });
  } catch ({ message }) {
    console.error(message);
    return res.status(500).json({ location: 1, message });
  }
});

// update meeting information
router.put('/', authorizeToken, async (req, res) => {
  try {
    const meeting = await Meeting.findByIdAndUpdate(req.body._id, req.body);
    if (!meeting) return res.status(404).json('meeting not found');
    return res.json(meeting);
  } catch ({ message }) {
    console.error(message);
    return res.status(500).json({ location: 1, message });
  }
});

// update meeting time
router.put('/time/:meetingId', authorizeToken, async ({
  body: { startTime, duration },
  params: { meetingId },
}, res) => {
  try {
    const meeting = await Meeting.findByIdAndUpdate(
      meetingId,
      { startTime, duration, endTime: calculateEndTime({ startTime, duration }) },
      { new: true },
    );
    return res.json(meeting);
  } catch ({ message }) {
    console.error(message);
    return res.status(500).json({ location: 1, message });
  }
});

// delete a meeting and remove the reference from the tutor
router.delete('/', authorizeToken, async (req, res) => {
  try {
    await deleteModelFromTutor(req.tutor._id, 'meetings', Meeting, req.body._id);
    return res.json('meeting deleted');
  } catch ({ message }) {
    console.error(message);
    return res.status(500).json({ location: 1, message });
  }
});

module.exports = router;
