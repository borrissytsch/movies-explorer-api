const movieRouter = require('express').Router();
const { movieJoiTest, filmIdJoiTest } = require('../middlewares/joiValidate');
const { movieRoutes } = require('../utils/constants');
const {
  getMovies, createMovie, deleteMovieById,
} = require('../controllers/movies');

const { filmId } = movieRoutes;

movieRouter.get('/', getMovies);
movieRouter.post('/', movieJoiTest(), createMovie);
movieRouter.delete(filmId, filmIdJoiTest(), deleteMovieById);

module.exports = movieRouter;
