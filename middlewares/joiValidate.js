const { celebrate, Joi } = require('celebrate');
const {
  strSchMinLen, strSchMaxLen, idSchemaLen, strSchPassLen, idPattern, linkPattern,
} = require('../utils/constants');

/* Users' Joi test patterns */
const signUpJoiTest = (signFields = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(strSchPassLen),
    name: Joi.string().required().min(strSchMinLen).max(strSchMaxLen),
  }).unknown(true),
}) => celebrate(signFields);
const signInJoiTest = (signFields = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(strSchPassLen),
  }).unknown(true),
}) => celebrate(signFields);
const idJoiTest = (id = {
  params: Joi.object().keys({
    userId: Joi.string().hex().length(idSchemaLen).pattern(idPattern),
  }).unknown(true),
}) => celebrate(id);
const userJoiTest = (user = {
  body: Joi.object().keys({
    name: Joi.string().min(strSchMinLen).max(strSchMaxLen),
    email: Joi.string().email(),
  }).unknown(true),
}) => celebrate(user);

/* Movies' Joi test patterns */
const filmIdJoiTest = (id = {
  params: Joi.object().keys({
    filmId: Joi.string().hex().length(idSchemaLen).pattern(idPattern),
  }).unknown(true),
}) => celebrate(id);
const movieJoiTest = (movie = {
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().uri().pattern(linkPattern),
    trailerLink: Joi.string().required().uri().pattern(linkPattern),
    thumbnail: Joi.string().required().uri().pattern(linkPattern),
    owner: Joi.string().hex().length(idSchemaLen).pattern(idPattern),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }).unknown(true),
}) => celebrate(movie);

module.exports = {
  signUpJoiTest, signInJoiTest, idJoiTest, userJoiTest, filmIdJoiTest, movieJoiTest,
};
