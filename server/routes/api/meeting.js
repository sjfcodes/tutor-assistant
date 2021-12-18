const router = require('express').Router();
const { Meeting } = require('../../models');
const { authorizeToken } = require('../../utils/auth');
const { deleteModelFromTutor, addModelToCourse } = require('../../utils/helpers');

router.post('/:id', async (req, res) => {
  const { tutor } = authorizeToken(req);
  if (!tutor) return res.status(401).json('unauthorized');

  const { _id, createdAt } = await Meeting.create(req.body);
  if (!_id) return res.statusMessage(500).json('failed to create meeting');

  try {
    await addModelToCourse(req.params.id, 'meetings', _id);
    res.json({ _id, createdAt });
  } catch (error) {
    console.error(error);
    res.status(500).json('failed to update tutor');
  }
  return '';
});

// update a meetings information
router.put('/', async (req, res) => {
  const { tutor } = authorizeToken(req);
  if (!tutor) return res.status(401).json('unauthorized');

  try {
    const meeting = await Meeting.findByIdAndUpdate(req.body._id, req.body);
    if (!meeting) return res.status(404).json('meeting not found');

    res.json('meeting updated');
  } catch (error) {
    console.error(error);
    res.status(500).json('failed to update meeting');
  }
  return '';
});

// delete a meeting and remove the reference from the tutor
router.delete('/', async (req, res) => {
  const { tutor } = authorizeToken(req);
  if (!tutor) return res.status(401).json('unauthorized');

  try {
    await deleteModelFromTutor(tutor._id, 'meetings', Meeting, req.body._id);
    res.json('meeting deleted');
  } catch (error) {
    console.error(error);
    res.status(500).json('failed to delete meeting');
  }
  return '';
});

module.exports = router;
