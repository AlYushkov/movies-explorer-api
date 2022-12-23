const { Router } = require('express');

const { celebrate, Joi } = require('celebrate');

const auth = require('../middlewares/auth');

const movieRouter = Router();

const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');

movieRouter.get('/', auth, getMovies);

movieRouter.post('/', auth, celebrate({
  body: Joi.object().keys({
    country: Joi.string().min(2).max(255),
    director: Joi.string().min(2).max(255),
    duration: Joi.number(),
    year: Joi.string().min(4).max(4),
    description: Joi.string().min(2).max(255),
    image: Joi.string().regex(/^(https|http)?:\/\/[A-Za-z0-9-_~:@/!/$&'()*+,;=?#[].]*([/]*.*\/?)$/),
    trailerLink: Joi.string().regex(/^(https|http)?:\/\/[A-Za-z0-9-_~:@/!/$&'()*+,;=?#[].]*([/]*.*\/?)$/),
    thumbnail: Joi.string().regex(/^(https|http)?:\/\/[A-Za-z0-9-_~:@/!/$&'()*+,;=?#[].]*([/]*.*\/?)$/),
    movieId: Joi.string().hex(),
    nameRU: Joi.string().min(2).max(255).regex(/^([а-яёА-ЯёЁ0-9,.!?;:()\-&#] ?)+$/),
    nameEN: Joi.string().min(2).max(255).regex(/^([a-zA-Z0-9,.!?;:()\-&#] ?)+$/),
  }),
}), createMovie);

movieRouter.delete('/:movieId', auth, celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex(),
  }),
}), deleteMovie);

module.exports = movieRouter;
