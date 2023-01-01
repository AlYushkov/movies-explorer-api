const rateLimit = require('express-rate-limit'); // Use to limit repeated requests to public API

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

module.exports = { limiter };
