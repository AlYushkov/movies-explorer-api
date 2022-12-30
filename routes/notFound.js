const { Router } = require('express');

const notFound = Router();

const auth = require('../middlewares/auth');

const NotFoundError = require('../errors/NotFoundError');

module.exports = notFound.use('*', auth, (req, res, next) => {
  const err = new NotFoundError();
  next(err);
});
