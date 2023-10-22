const mongoose = require('mongoose');
const validator = require('validator'); // 2 версии, здесь задаются опции, про validators - вопрос
// const validators = require('mongoose-validators');
const {
  linkFailMsg, NODE_ENV, envProduction, trcFlag, trcMoviesFlag, trcSchValidateFlag, urlValidOptions,
} = require('../utils/constants');
const { logPassLint } = require('../utils/miscutils');

const movieSchema = new mongoose.Schema({
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
  /* ‼ Спакойна, товарърыщьчь, спакойна: isURL проверяет его реальность, а не только синтаксис ‼ */
  image: {
    type: String,
    required: true,
    validate: /* validators.isURL() */ {
      validator(lnk, options = urlValidOptions) {
        if (trcFlag && trcMoviesFlag && NODE_ENV !== envProduction) logPassLint(`Movie image link test in schema: ${validator.isURL(lnk)} 4 ${lnk}`, trcSchValidateFlag);
        return validator.isURL(lnk, options);
      },
      message: linkFailMsg,
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: /* validators.isURL() */ {
      validator(lnk, options = urlValidOptions) {
        if (trcFlag && trcMoviesFlag && NODE_ENV !== envProduction) logPassLint(`Movie trailerLink test in schema: ${validator.isURL(lnk)} 4 ${lnk}`, trcSchValidateFlag);
        return validator.isURL(lnk, options);
      },
      message: linkFailMsg,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: /* validators.isURL() */ {
      validator(lnk, options = urlValidOptions) {
        if (trcFlag && trcMoviesFlag && NODE_ENV !== envProduction) logPassLint(`Movie link test in schema: ${validator.isURL(lnk)} 4 ${lnk}`, trcSchValidateFlag);
        return validator.isURL(lnk, options);
      },
      message: linkFailMsg,
    },
  },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  movieId: {
    type: Number,
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

module.exports = mongoose.model('movie', movieSchema);
