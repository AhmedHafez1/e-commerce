const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const Errors = require('../errors');

const login = async (req, res) => {
  res.send('Login');
};

const register = async (req, res) => {
  const { email } = req.body;
  const emailAlreadyExist = await User.findOne({ email });
  if (emailAlreadyExist)
    throw new Errors.BadRequestError('Email already exists!');
  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ user });
};

const logout = async (req, res) => {
  res.send('Logout');
};

module.exports = { login, logout, register };
