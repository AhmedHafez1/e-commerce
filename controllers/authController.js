const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const Errors = require('../errors');

const login = async (req, res) => {
  res.send('Login');
};

const register = async (req, res) => {
  const { name, password, email } = req.body;
  const emailAlreadyExist = await User.findOne({ email });
  if (emailAlreadyExist)
    throw new Errors.BadRequestError('Email already exists!');
  const user = await User.create({ name, email, password });
  res.status(StatusCodes.CREATED).json({ user });
};

const logout = async (req, res) => {
  res.send('Logout');
};

module.exports = { login, logout, register };
