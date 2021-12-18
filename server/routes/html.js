const path = require('path');
const router = require('express').Router();

router.get('*', (req, res) => {
  console.log('here');
  console.log(__dirname);
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

module.exports = router;
