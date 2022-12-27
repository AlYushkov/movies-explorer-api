const { Schema, model } = require('mongoose');

const bcrypt = require('bcrypt');

const validator = require('validator');

const { AppError, appErrors } = require('../utils/app-error');

const schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

schema.statics.findUserByCredentials = function VerifyUser(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new AppError(appErrors.notAuthorized));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new AppError(appErrors.notAuthorized));
          }
          return user;
        });
    });
};

module.exports = model('User', schema);
