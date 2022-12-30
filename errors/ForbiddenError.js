const { FORBIDDEN } = require('./app-errors');

class ForbiddenError extends Error {
  constructor() {
    super(FORBIDDEN.message);
    this.statusCode = FORBIDDEN.status;
  }
}

module.exports = ForbiddenError;
