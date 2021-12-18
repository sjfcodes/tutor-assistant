const path = require('path');
const router = require('express').Router();

router.get('*', (req, res) => {
  // console.log('here');
  // __dirname = /app/server/routes
  // console.log(path.join(__dirname, '../../client/build/index.html'));
  res.sendFile(path.join(__dirname, '../../client/build/index.html'));
});

module.exports = router;
