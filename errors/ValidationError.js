const { VALIDATION } = require('./app-errors');

class ValidationError extends Error {
  constructor() {
    super(VALIDATION.message);
    this.statusCode = VALIDATION.status;
  }
}

module.exports = ValidationError;
