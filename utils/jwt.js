const { sign, verify } = require('jsonwebtoken');

const createJwt = ({ payload }) => {
  return sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

const isTokenValid = ({ token }) => verify(token, process.env.JWT_SECRET);

const attachCookiesToResponse = ({ res, payload }) => {
  const token = createJwt({ payload });
  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === 'production',
    signed: true,
  });
};

module.exports = { createJwt, isTokenValid, attachCookiesToResponse };
