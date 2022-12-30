const { NOTFOUND } = require('./app-errors');

class NotFoundError extends Error {
  constructor() {
    super(NOTFOUND.message);
    this.statusCode = NOTFOUND.status;
  }
}

module.exports = NotFoundError;
