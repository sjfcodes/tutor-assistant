const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;
// https://www.npmjs.com/package/jsonwebtoken
// const expiration = '2h';
const expiration = '10d';

module.exports = {
  authorizeToken: (req) => {
    let token = req.body.token || req.query.token || req.headers.authorization;
    if (req.headers.authorization) token = token.split(' ').pop().trim();
    if (!token) return req;

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.tutor = data;
    } catch (error) {
      console.error(error);
      return false;
    }

    return req;
  },
  signToken: ({ email, username, _id }) => {
    const payload = { email, username, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
