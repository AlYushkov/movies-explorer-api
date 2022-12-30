const ServerError = require('../errors/ServerError');

const errorHandle = (error, req, res, next) => {
  if (res.headersSent !== true) {
    let errMessage;
    let statusCode;
    if (error.statusCode) {
      statusCode = error.statusCode;
      errMessage = error.message;
    } else {
      const err = new ServerError();
      statusCode = err.statusCode;
      errMessage = err.message;
    }
    res.status(statusCode).send({ message: errMessage });
  }
  next();
};

module.exports = { errorHandle };
