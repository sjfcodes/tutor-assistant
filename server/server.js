const express = require('express');
const path = require('path');
const cors = require('cors');
const compression = require('compression');
const { ApolloServer } = require('apollo-server-express');
const schema = require('./schemas');
const db = require('./config/connection');
// const { authMiddleware } = require('./utils/auth');

const { reportStatus } = require('./utils/consoleColors/index.js');

const app = express();
const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
  schema,
  // context: authMiddleware,
});

app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
server.applyMiddleware({ app });

// if we're in production, serve build folder as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

db.once('open', () => {
  app.listen(PORT, () => {
    reportStatus(`API server running on port ${PORT}!`);
    // log where we can go to test our GQL API
    reportStatus(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
