const express = require('express');
const cors = require('cors')
const compression = require("compression");
require('./config/connection');

// make sure the `baseUrl` in the front-end matches the `PORT`
const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors())
app.use(compression());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(express.static("client/build"));
app.use(express.json());
app.use('/api', require('./routes'))

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}!`);
});
