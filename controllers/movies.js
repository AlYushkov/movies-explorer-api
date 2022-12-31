const Movie = require('../models/movie');

const CastError = require('../errors/CastError');
const ForbiddenError = require('../errors/ForbiddenError');
const ValidatiuonError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundError');
const ServerError = require('../errors/ServerError');

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
        return Promise.reject(new ServerError());
      }
      res.send({ data: movie });
      return true;
    })
    .catch((e) => {
      let err;
      if (e.statusCode) {
        err = e;
      } else if (e.name === 'ValidationError') {
        err = new ValidatiuonError();
      } else {
        err = new ServerError();
      }
      next(err);
    });
};

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movie) => {
      res.send({ data: movie });
    })
    .catch(() => {
      const err = new ServerError();
      next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { _id } = req.params;
  Movie.findById(_id)
    .then((movie) => {
      if (!movie) {
        return Promise.reject(new NotFoundError());
      } if (`${movie.owner}` !== req.user._id) {
        return Promise.reject(new ForbiddenError());
      }
      return true;
    })
    .then(() => {
      Movie.findByIdAndRemove(_id)
        .then((movie) => {
          if (!movie) {
            return Promise.reject(new ServerError());
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
        err = new CastError();
      } else {
        err = new ServerError();
      }
      next(err);
    });
};
