const { sign, verify } = require('jsonwebtoken');

const createJwt = ({ payload }) => {
  return sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

const isTokenValid = ({ token }) => verify(token, process.env.JWT_SECRET);

module.exports = { createJwt, isTokenValid };
