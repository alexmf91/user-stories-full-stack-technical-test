const { Router } = require('express');
const passport = require('passport');
const userController = require('../controllers/user');

const userRouter = new Router();

userRouter
  .route('/')
  .get(userController.getAll);

userRouter
  .route('/auth/register')
  .all(passport.authenticate('signup', { session: false }))
  .post(userController.signUp);

userRouter
  .route('/auth/login')
  .all(passport.authenticate('login', { session: false }))
  .post(userController.logIn);

userRouter
  .route('/profile')
  .all(passport.authenticate('jwt', { session: false }))
  .get(userController.protectedProfile);

module.exports = userRouter;
