const { Router } = require('express');

const authRouter = Router();

const auth = require('../middlewares/auth');

const { celebrateSignup, celebrateSignin } = require('../validators/celebrateAuthentic');

const { createUser, login, logout } = require('../controllers/users');

authRouter.post('/signin', celebrateSignin, login);

authRouter.post('/signup', celebrateSignup, createUser);

authRouter.get('/signout', auth, logout);

module.exports = authRouter;
