const { Router } = require('express');

const authRouter = Router();

const { celebrate, Joi } = require('celebrate');

const { createUser, login, logout } = require('../controllers/users');

authRouter.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

authRouter.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

authRouter.get('/signout', logout);

module.exports = authRouter;
