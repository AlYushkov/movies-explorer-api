const { Router } = require('express');

const { celebrate, Joi } = require('celebrate');

const auth = require('../middlewares/auth');

const userRouter = Router();

const {
  updateUser, getMe, verifyAccess,
} = require('../controllers/users');
const access = require('../middlewares/access');

userRouter.get('/access', access, verifyAccess); // to prevent an error from being thrown

userRouter.get('/me', auth, getMe);

userRouter.patch('/me', auth, celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
  }),
}), updateUser);

module.exports = userRouter;
