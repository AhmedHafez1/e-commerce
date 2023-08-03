const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const Errors = require('../errors');
const { createJwt } = require('../utils');

const login = async (req, res) => {
  res.send('Login');
};

const register = async (req, res) => {
  const { name, password, email } = req.body;
  const emailAlreadyExist = await User.findOne({ email });
  if (emailAlreadyExist)
    throw new Errors.BadRequestError('Email already exists!');

  const user = await User.create({ name, email, password });

  const tokenUser = { name: user.name, role: user.role, email: user.email };
  const token = createJwt({ payload: tokenUser });
  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
  });

  res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

const logout = async (req, res) => {
  res.send('Logout');
};

module.exports = { login, logout, register };
