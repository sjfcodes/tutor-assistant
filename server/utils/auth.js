const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;
// https://www.npmjs.com/package/jsonwebtoken
// const expiration = '2h';
const expiration = '1d';

module.exports = {
  authorizeToken: (req, res, next) => {
    let token = req.headers.authorization;
    if (req.headers.authorization) token = token.split(' ').pop().trim();
    if (!token) return res.status(401).json({ location: 1, message: 'unauthorized' });

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.tutor = data;
    } catch ({ message }) {
      console.error(message);
      return res.status(401).json({ location: 2, message });
    }

    return next();
  },
  signToken: ({ email, _id, accountKey }) => {
    const payload = { email, _id, accountKey };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },

};
