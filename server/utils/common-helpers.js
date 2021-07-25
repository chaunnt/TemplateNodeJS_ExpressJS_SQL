const _ = require('lodash');
const { secrets } = require('../config/config');
const jwt = require('jsonwebtoken');

const getCurrentUser = req => {
  const authorization =
    _.get(req, ['headers', 'authorization']) ||
    _.get(req, ['headers', 'Authorization']);
  let token = null;
  let currentUser;
  if (!!authorization) {
    token =
      authorization.split(' ')[0] === 'Bearer'
        ? authorization.split(' ')[1]
        : authorization;
  } else if (req.query && req.query.token) {
    token = req.query.token;
  }
  if (!token) return null;
  try {
    currentUser = token ? jwt.verify(token, secrets) : null;
  } catch (e) {
    return null;
  }
  return currentUser;
};

const handlerResponse = funct => {
  return async (req, res, next) => {
    try {
      return await funct(req, res);
    } catch (error) {
      console.log('error:', error);
      return next(error);
    }
  };
};

module.exports = {
  getCurrentUser,
  handlerResponse
};
