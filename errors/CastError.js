const { CAST } = require('./app-errors');

class CastError extends Error {
  constructor() {
    super(CAST.message);
    this.statusCode = CAST.status;
  }
}

module.exports = CastError;
