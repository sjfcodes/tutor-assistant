const path = require('path');
const router = require('express').Router();

router.get('*', (req, res) => {
  // __dirname = /app/server/routes
  res.sendFile(path.join(__dirname, '../../client/build/index.html'));
});

module.exports = router;
