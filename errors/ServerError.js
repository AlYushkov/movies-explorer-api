const { SERVER } = require('./app-errors');

class ServerError extends Error {
  constructor() {
    super(SERVER.message);
    this.statusCode = SERVER.status;
  }
}

module.exports = ServerError;
