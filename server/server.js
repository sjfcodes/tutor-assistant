/* eslint-disable no-console */
const express = require('express');
const path = require('path');
const cors = require('cors');
const compression = require('compression');
const { reportStatus } = require('./utils/consoleColors/index.js');

require('./config/connection');
require('./utils/callbot');

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
  reportStatus(`running on port ${PORT}`);
});
