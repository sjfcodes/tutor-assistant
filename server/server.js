/* eslint-disable no-console */
const express = require('express');
const path = require('path');
const cors = require('cors');
const compression = require('compression');
require('./config/connection');
// make sure the `baseUrl` in the front-end matches the `PORT`
const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(compression());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', require('./routes'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}!`);
});
