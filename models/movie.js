const mongoose = require('mongoose');

const { Schema, model } = require('mongoose');

const movieSchema = new Schema({
  country: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  director: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 4,
  },
  description: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  image:
    {
      type: String,
      validate: {
        validator(v) {
          return /^(https|http)?:\/\/[A-Za-z0-9-_~:@/!/$&'()*+,;=?#[].]*([/]*.*\/?)$/.test(v);
        },
      },
      required: true,
    },
  trailerLink:
    {
      type: String,
      validate: {
        validator(v) {
          return /^(https|http)?:\/\/[A-Za-z0-9-_~:@/!/$&'()*+,;=?#[].]*([/]*.*\/?)$/.test(v);
        },
      },
      required: true,
    },
  thumbnail:
    {
      type: String,
      validate: {
        validator(v) {
          return /^(https|http)?:\/\/[A-Za-z0-9-_~:@/!/$&'()*+,;=?#[].]*([/]*.*\/?)$/.test(v);
        },
      },
      required: true,
    },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  nameRU: {
    type: String,
    validate: {
      validator(v) {
        return /^([а-яёА-ЯёЁ0-9,.!?;:()\-&#] ?)+$/.test(v);
      },
    },
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  nameEN: {
    type: String,
    validate: {
      validator(v) {
        return /^([a-zA-Z0-9,.!?;:()\-&#] ?)+$/.test(v);
      },
    },
    required: true,
    minlength: 2,
    maxlength: 255,
  },
});

module.exports = model('movie', movieSchema);
