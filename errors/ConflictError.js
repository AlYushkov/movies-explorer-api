const { CONFLICT } = require('./app-errors');

class ConflictError extends Error {
  constructor() {
    super(CONFLICT.message);
    this.statusCode = CONFLICT.status;
  }
}

module.exports = ConflictError;
