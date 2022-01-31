const jwt = require('jsonwebtoken');
const { reportError } = require('./consoleColors/index.js');
require('dotenv').config();

const secret = process.env.JWT_SECRET;
// https://www.npmjs.com/package/jsonwebtoken
// const expiration = '2h';
const expiration = '1d';

module.exports = {
  authMiddleware: ({ req }) => {
    let token = req.body.token || req.query.token || req.headers.authorization;
    if (req.headers.authorization) token = token.split(' ').pop().trim();

    if (!token) return req;

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.tutor = data;
    } catch ({ message }) {
      reportError(message);
      console.log('Invalid token');
    }
    return req;
  },
  signToken: ({ _id, email, accountKey }) => {
    const payload = { email, _id, accountKey };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },

};
