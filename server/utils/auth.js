const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;
// https://www.npmjs.com/package/jsonwebtoken
// const expiration = '2h';
const expiration = '1d';

module.exports = {
  authorizeToken: (req, res, next) => {
    let token = req.headers.authorization;
    if (req.headers.authorization) token = token.split(' ').pop().trim();
    if (!token) return res.status(401).json('unauthorized:12');

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.tutor = data;
    } catch (error) {
      console.error(error);
      return res.status(401).json('unauthorized:18');
    }

    return next();
  },
  signToken: ({ email, username, _id }) => {
    const payload = { email, username, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
