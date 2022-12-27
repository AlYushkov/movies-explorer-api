const { AppError, appErrors } = require('../utils/app-error');

const notFound = (req, res, next) => {
  const err = new AppError(appErrors.notFound);
  next(err);
};

module.exports = { notFound };
