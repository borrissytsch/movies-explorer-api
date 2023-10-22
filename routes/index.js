const rootRouter = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const { USERS, MOVIES } = require('../utils/constants');

rootRouter.use(USERS, userRouter);
rootRouter.use(MOVIES, movieRouter);

module.exports = rootRouter;
