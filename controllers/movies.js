const Movie = require('../models/movie');

const { AppError, appErrors } = require('../utils/app-error');

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
    .then((movie) => {
      if (!movie) {
        return Promise.reject(new AppError(appErrors.serverError));
      }
      res.send({ data: movie });
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
  const { _id } = req.params;
  Movie.findById(_id)
    .then((movie) => {
      if (!movie) {
        return Promise.reject(new AppError(appErrors.notFound));
      } if (`${movie.owner}` !== req.user._id) {
        return Promise.reject(new AppError(appErrors.forbidden));
      }
      return true;
    })
    .then(() => {
      Movie.findByIdAndRemove(_id)
        .then((movie) => {
          if (!movie) {
            return Promise.reject(new AppError(appErrors.serverError));
          }
          res.send({ data: movie });
          return true;
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
