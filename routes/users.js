const { Router } = require('express');

const { celebrate, Joi } = require('celebrate');

const auth = require('../middlewares/auth');

const userRouter = Router();

const {
  updateUser, getMe,
} = require('../controllers/users');

userRouter.get('/me', auth, getMe);

userRouter.patch('/me', auth, celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
}), updateUser);

module.exports = userRouter;
