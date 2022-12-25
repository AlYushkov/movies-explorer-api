const { Router } = require('express');

const authRouter = Router();

const { celebrate, Joi } = require('celebrate');

const { createUser, login, logout } = require('../controllers/users');

authRouter.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

authRouter.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).default('Кинолюбитель'),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), createUser);

authRouter.get('/signout', logout);

module.exports = authRouter;
