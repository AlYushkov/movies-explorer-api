const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

const User = require('../models/user');

require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

const { DEV_JWT_SECRET } = require('../utils/dev-params');

const { AppError, appErrors } = require('../utils/app-error');

module.exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name: req.body.name,
      email: req.body.email,
      password: hash,
    }))
    .then((user) => {
      if (!user) {
        return Promise.reject(new AppError(appErrors.serverError));
      }
      res.send({
        data: {
          name: user.name,
          email: user.email,
        },
      });
      return true;
    })
    .catch((e) => {
      let err;
      if (e.code === 11000) {
        err = new AppError(appErrors.conflict);
      } else if (e.name === 'ValidationError') {
        err = new AppError(appErrors.badRequest);
      } else if (e.statusCode) {
        err = e;
      } else {
        err = new AppError(appErrors.serverError);
      }
      next(err);
    });
};

module.exports.getMe = (req, res, next) => {
  User.findById(req.user)
    .then((user) => {
      res.send({ data: user });
    })
    .catch(() => {
      const err = new AppError(appErrors.serverError);
      next(err);
    });
};

module.exports.updateUser = (req, res, next) => {
  const myId = req.user._id;
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user && (`${user._id}`) !== myId) {
        return Promise.reject(new AppError(appErrors.conflict));
      }
      return true;
    })
    .then(() => {
      User.findByIdAndUpdate(
        req.user._id,
        { name: req.body.name, email: req.body.email },
        {
          new: true,
          runValidators: true,
          upsert: false,
        },
      )
        .then((user) => {
          if (!user) {
            return Promise.reject(new AppError(appErrors.serverError));
          }
          res.send({ data: user });
          return true;
        })
        .catch((e) => {
          let err;
          if (e.statusCode) {
            err = e;
          } else if (e.name === 'ValidationError') {
            err = new AppError(appErrors.badRequest);
          } else {
            err = new AppError(appErrors.serverError);
          }
          next(err);
        });
    })
    .catch((e) => {
      next(e);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : DEV_JWT_SECRET, { expiresIn: '7d' });
      const userData = { email: user.email, name: user.name };
      res
        .cookie('jwt', token, {
          maxAge: 7 * 24 * 60 * 60 * 1000,
          httpOnly: true,
          sameSite: true,
        })
        .send({ data: userData });
    })
    .catch((e) => {
      let err;
      if (e.statusCode) {
        err = e;
      } else {
        err = new AppError(appErrors.serverError);
      }
      next(err);
    });
};

module.exports.logout = (req, res) => {
  res.clearCookie('jwt').json({ message: 'До встречи!' });
};
