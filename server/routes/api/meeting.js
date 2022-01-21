const router = require('express').Router();
const { Meeting } = require('../../models');
const { authorizeToken } = require('../../utils/auth');
const { reportError } = require('../../utils/consoleColors');
const { calculateEndTime } = require('../../utils/dateTime');
const { deleteModelFromTutor, addModelToCourse } = require('../../utils/helpers');

// create a meeting
router.post('/:tutorId', authorizeToken, async (req, res) => {
  try {
    const meeting = await Meeting.create(req.body);
    if (!meeting._id) return res.statusMessage(500).json({ message: 'failed to create meeting' });

    await addModelToCourse(req.params.tutorId, 'meetings', meeting._id);
    return res.json(meeting);
  } catch ({ message }) {
    reportError(message);
    return res.status(500).json({ location: 1, message });
  }
});

// update meeting information
router.put('/', authorizeToken, async (req, res) => {
  try {
    const meeting = await Meeting.findByIdAndUpdate(req.body._id, req.body, { new: true });
    if (!meeting) return res.status(404).json({ message: 'meeting not found' });
    return res.json(meeting);
  } catch ({ message }) {
    reportError(message);
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
    reportError(message);
    return res.status(500).json({ location: 1, message });
  }
});

// delete a meeting and remove the reference from the tutor
router.delete('/', authorizeToken, async (req, res) => {
  try {
    await deleteModelFromTutor(req.tutor._id, 'meetings', Meeting, req.body._id);
    return res.json('meeting deleted');
  } catch ({ message }) {
    reportError(message);
    return res.status(500).json({ location: 1, message });
  }
});

module.exports = router;
