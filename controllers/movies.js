const Movie = require('../models/movie');
const NotFound = require('../errors/NotFound');
const Forbidden = require('../errors/Forbidden');

const {
  resOkDefault, resOKCreated, errIncorrectData, errDefault, errValidationErr, trcFlag, NODE_ENV,
  envProduction, trcMoviesFlag, errTraceFlag,
} = require('../utils/constants');
const { logPassLint } = require('../utils/miscutils');

function getMovies(req, res) {
  if (trcFlag && NODE_ENV !== envProduction) logPassLint(`Get movies 4 ${req.user._id}`, trcMoviesFlag);
  Movie.find({ owner: { $eq: req.user._id } }).then((movieList) => {
    res.status(resOkDefault).send({ data: movieList });
  }).catch((err) => {
    logPassLint(err, errTraceFlag);
    res.status(errDefault.num).send({ message: errDefault.msg });
  });
}
//
function createMovie(req, res) {
  if (trcFlag && NODE_ENV !== envProduction) logPassLint(`${Object.entries(req.body).join('; ')} / ${req.user._id}`, trcMoviesFlag);
  const {
    country, director, duration, year, description, image, trailerLink, thumbnail,
    owner = req.user._id, movieId, nameRU, nameEN,
  } = req.body;
  Movie.create(
    {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      owner,
      movieId,
      nameRU,
      nameEN,
    },
  ).then((movie) => {
    res.status(resOKCreated).send({
      data: {
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: movie.image,
        trailerLink: movie.trailerLink,
        thumbnail: movie.thumbnail,
        owner: movie.owner,
        movieId: movie.movieId,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      },
    });
  }).catch((err) => {
    if (err.name === errValidationErr) {
      logPassLint(`Error ${errIncorrectData.num}: ${err}`, errTraceFlag);
      res.status(errIncorrectData.num).send({ message: errIncorrectData.msg });
    } else {
      logPassLint(`Error ${errDefault.num}: ${err}`, errTraceFlag);
      res.status(errDefault.num).send({ message: errDefault.msg });
    }
  });
}

function deleteMovieById(req, res, next) {
  const { filmId } = req.params;
  if (trcFlag && NODE_ENV !== envProduction) logPassLint(`Delete movie by ${filmId}`, trcMoviesFlag);
  Movie.findById(filmId).then((movie) => {
    if (trcFlag && NODE_ENV !== envProduction) logPassLint(`Del movie ${filmId} owned by ${movie.owner} starts 4: ${req.user._id}`, trcMoviesFlag);
    if (!movie) return Promise.reject(new NotFound());
    if (String(movie.owner) !== String(req.user._id)) throw new Forbidden();
    Movie.findByIdAndRemove(filmId).then((MongoMovie) => {
      if (!MongoMovie) return Promise.reject(new NotFound());
      if (trcFlag && NODE_ENV !== envProduction) logPassLint(`Movie ${filmId} was deleted with status: ${resOkDefault} / ${MongoMovie}`, trcMoviesFlag);
      return res.status(resOkDefault).send({ data: MongoMovie });
    }).catch((err) => {
      next(err);
    });
    return resOkDefault;
  }).catch((err) => {
    next(err);
  });
}

function updateMovieById(id, updateData, updateOptions = { new: true }) {
  return Movie.findByIdAndUpdate(id, updateData, updateOptions).then((movie) => {
    if (trcFlag && NODE_ENV !== envProduction) logPassLint(`Movie after update: ${movie}`, trcMoviesFlag);
    if (!movie) return Promise.reject(new NotFound());
    return Promise.resolve(movie); // res.send({ data: movie });
  }).catch((err) => Promise.reject(err));
}

module.exports = {
  getMovies, createMovie, deleteMovieById, updateMovieById,
};
