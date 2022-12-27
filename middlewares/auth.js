const jwt = require('jsonwebtoken');
const { AppError, appErrors } = require('../utils/app-error');

require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

const { DEV_JWT_SECRET } = require('../utils/dev-params');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : DEV_JWT_SECRET);
  } catch (e) {
    const err = new AppError(appErrors.notAuthorized);
    next(err);
    return;
  }
  req.user = payload;
  next();
};
