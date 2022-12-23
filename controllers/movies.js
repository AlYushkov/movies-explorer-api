const Movie = require('../models/movie');

const { AppError, appErrors } = require('../utils/app-error');

// getMovies, createMovie, deleteMovie

module.exports.createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description, image, trailerLink, nameRU,
    nameEN, thumbnail, movieId,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    // eslint-disable-next-line consistent-return
    .then((movie) => {
      if (!movie) {
        return Promise.reject(new AppError(appErrors.serverError));
      }
      res.send({ data: movie });
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
};

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movie) => {
      res.send({ data: movie });
    })
    .catch(() => {
      const err = new AppError(appErrors.serverError);
      next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
  // eslint-disable-next-line consistent-return
    .then((movie) => {
      if (!movie) {
        return Promise.reject(new AppError(appErrors.notFound));
      } if (String(movie.owner) !== req.user._id) {
        return Promise.reject(new AppError(appErrors.forbidden));
      }
    })
    .then(() => {
      Movie.findByIdAndRemove(movieId)
      // eslint-disable-next-line consistent-return
        .then((movie) => {
          if (!movie) {
            return Promise.reject(new AppError(appErrors.serverError));
          }
          res.send({ data: movie });
        })
        .catch((e) => {
          next(e);
        });
    })
    .catch((e) => {
      let err;
      if (e.statusCode) {
        err = e;
      } else if (e.name === 'CastError') {
        err = new AppError(appErrors.badRequest);
      } else {
        err = new AppError(appErrors.serverError);
      }
      next(err);
    });
};
