const { Router } = require('express');

const appRouter = Router();

const authRouter = require('./authentic');

const userRouter = require('./users');

const movieRouter = require('./movies');

const notfoundRouter = require('./notFound');

appRouter.use('/users', userRouter);

appRouter.use('/movies', movieRouter);

appRouter.use('/', authRouter);

appRouter.use('*', notfoundRouter);

module.exports = appRouter;
