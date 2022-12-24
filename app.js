const express = require('express');

const bodyParser = require('body-parser'); // Parse incoming request bodies

const rateLimit = require('express-rate-limit'); // Use to limit repeated requests to public APIs

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

const { celebrate, Joi, errors } = require('celebrate'); // function that wraps the joi validation library

const cookieParser = require('cookie-parser'); // Parse Cookie header and populate req.cookies

const mongoose = require('mongoose');

const helmet = require('helmet'); // secure Express apps by setting various HTTP headers

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3002 } = process.env;

const userRouter = require('./routes/users');

const movieRouter = require('./routes/movies');

const { createUser, login, logout } = require('./controllers/users');

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

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).default('Кинолюбитель'),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), createUser);

app.get('/signout', logout);

app.use('/users', userRouter);

app.use('/movies', movieRouter);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

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
mongoose.connect('mongodb://127.0.0.1:27017/moviesdb');

app.listen(PORT);
