const express = require('express');

require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', require('./routes'))

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}!`);
});
