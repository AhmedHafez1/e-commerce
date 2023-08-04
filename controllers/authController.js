const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const Errors = require('../errors');
const { attachCookiesToResponse } = require('../utils');

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    throw new Errors.BadRequestError('Please provide email and password');
  const user = await User.findOne({ email });

  if (!user) throw new Errors.UnauthenticatedError('No user with this email');

  const isValidPassword = await user.comparePassword(password);

  if (!isValidPassword)
    throw new Errors.UnauthenticatedError('Password is not correct');

  const tokenUser = { name: user.name, role: user.role, email: user.email };
  attachCookiesToResponse({ res, payload: tokenUser });

  res.status(StatusCodes.OK).json({ user: tokenUser });
};

const register = async (req, res) => {
  const { name, password, email } = req.body;
  const emailAlreadyExist = await User.findOne({ email });
  if (emailAlreadyExist)
    throw new Errors.BadRequestError('Email already exists!');

  const user = await User.create({ name, email, password });

  const tokenUser = { name: user.name, role: user.role, email: user.email };

  attachCookiesToResponse({ res, payload: tokenUser });

  res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

const logout = async (req, res) => {
  res.send('Logout');
};

module.exports = { login, logout, register };
