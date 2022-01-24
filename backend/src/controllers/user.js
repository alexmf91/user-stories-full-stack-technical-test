/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const refreshTokens = [];

async function getAll({ query }, res) {
  try {
    const users = await User.find(query);
    res.json(users);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
}

function signUp({ user }, res) {
  res.send({
    user,
    message: 'Register successfully',
  });
}

function logIn({ user }, res) {
  const data = { _id: user._id, userName: user.userName };
  try {
    const token = jwt.sign({ user: data }, process.env.JWT_SECRET, {
      expiresIn: '10m',
    });
    const refreshToken = jwt.sign({ user: data }, process.env.JWT_SECRET);

    refreshTokens.push(refreshToken);

    return res.json({
      token,
      refreshToken,
    });
  } catch (error) {
    res.status(500);
    return res.send(error);
  }
}

async function protectedProfile({ user }, res) {
  res.json({
    user,
  });
}

module.exports = {
  getAll,
  signUp,
  logIn,
  protectedProfile,
};
