const userRouter = require('express').Router();
const { /* idJoiTest, */userJoiTest } = require('../middlewares/joiValidate');
const { userRoutes } = require('../utils/constants');
const {
  /* getUsers, getUserById, */getUserIInfo, updateProfile,
} = require('../controllers/users');

const { /* userId, */userProfile } = userRoutes;

// userRouter.get('/', getUsers);
userRouter.get(userProfile, getUserIInfo);
// userRouter.get(userId, idJoiTest(), getUserById);
userRouter.patch(userProfile, userJoiTest(), updateProfile);

module.exports = userRouter;
