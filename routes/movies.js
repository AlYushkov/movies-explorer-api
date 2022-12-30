const { Router } = require('express');

const { celebrateNewMovie, celebrateDeleteMovie } = require('../validators/celebrateMovie');

const auth = require('../middlewares/auth');

const movieRouter = Router();

const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');

movieRouter.get('/', auth, getMovies);

movieRouter.post('/', auth, celebrateNewMovie, createMovie);

movieRouter.delete('/:_id', auth, celebrateDeleteMovie, deleteMovie);

module.exports = movieRouter;
