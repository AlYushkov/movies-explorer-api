const mongoose = require('mongoose');

const { Schema, model } = require('mongoose');

const movieSchema = new Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
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
    type: Number,
    validate: {
      validator: Number.isInteger,
    },
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = model('movie', movieSchema);
