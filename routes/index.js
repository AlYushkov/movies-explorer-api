const { Router } = require('express');

const appRouter = Router();

const userRouter = require('./users');

const movieRouter = require('./movies');

appRouter.use('/users', userRouter);

appRouter.use('/movies', movieRouter);

module.exports = appRouter;
