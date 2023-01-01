const { NOTAUTHORIZED } = require('./app-errors');

class NotAuthorizedError extends Error {
  constructor() {
    super(NOTAUTHORIZED.message);
    this.statusCode = NOTAUTHORIZED.status;
  }
}

module.exports = NotAuthorizedError;
