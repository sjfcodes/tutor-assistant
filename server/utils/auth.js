const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;
const expiration = '2h';

module.exports = {
  authorizeToken: function (req) {
    let token = req.body.token || req.query.token || req.headers.authorization;
    if (req.headers.authorization) token = token.split(' ').pop().trim();
    if (!token) return req;

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.tutor = data;
    } catch {
      console.log('Invalid token');
      return false
    }

    return req;
  },
  signToken: function ({ email, username, _id }) {
    const payload = { email, username, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
