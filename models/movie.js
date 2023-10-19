const mongoose = require('mongoose');
const validator = require('validator');
const { linkFailMsg } = require('../utils/constants');

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
  image: {
    type: String,
    required: true,
    validate: {
      validator(lnk) {
        // console.log(`Movie link test in schema: ${validator.isURL(lnk)} 4 ${lnk}`);
        return validator.isURL(lnk);
      },
      message: linkFailMsg,
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator(lnk) {
        // console.log(`Movie link test in schema: ${validator.isURL(lnk)} 4 ${lnk}`);
        return validator.isURL(lnk);
      },
      message: linkFailMsg,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(lnk) {
        // console.log(`Movie link test in schema: ${validator.isURL(lnk)} 4 ${lnk}`);
        return validator.isURL(lnk);
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
