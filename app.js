const express = require('express');

const bodyParser = require('body-parser'); // Parse incoming request bodies

const rateLimit = require('express-rate-limit'); // Use to limit repeated requests to public APIs

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

const { errors } = require('celebrate'); // function that wraps the joi validation library

const cookieParser = require('cookie-parser'); // Parse Cookie header and populate req.cookies

const mongoose = require('mongoose');

const helmet = require('helmet'); // secure Express apps by setting various HTTP headers

const { requestLogger, errorLogger } = require('./middlewares/logger');

require('dotenv').config();

const { PORT, MONGO_DB_NAME, HOST } = process.env;

const appRouter = require('./routes/index');

const { AppError, appErrors } = require('./utils/app-error');

const { cors } = require('./middlewares/cors');

const { errorHandle } = require('./middlewares/errorHandle');

const app = express();

app.use((req, res, next) => {
  cors(req, res, next);
});

app.use(helmet());

app.use(bodyParser.json());

app.use(cookieParser());

app.use(express.json());

app.use(requestLogger);

app.use(limiter);

app.use('/', appRouter);

app.use(errorLogger);

app.use((req, res, next) => {
  const err = new AppError(appErrors.notFound);
  next(err);
});

app.use(errors());

app.use((error, req, res, next) => {
  errorHandle(error, req, res, next);
});

mongoose.set('strictQuery', true);

mongoose.connect(`mongodb://${HOST}/${MONGO_DB_NAME}`);

app.listen(PORT);
