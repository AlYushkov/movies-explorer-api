const { Router } = require('express');

const celebrateUser = require('../validators/celebrateUser');

const auth = require('../middlewares/auth');

const userRouter = Router();

const {
  updateUser, getMe,
} = require('../controllers/users');

userRouter.get('/me', auth, getMe);

userRouter.patch('/me', auth, celebrateUser, updateUser);

module.exports = userRouter;
