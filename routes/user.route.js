const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const auth = require('../auth/user.auth');
const controllers = require('../controllers/user.controller')


//signup validation
const userValidationRules = () => [
    body('username').notEmpty().withMessage('Username is required')
    .isLength({min: 5}).withMessage('Username must be 5 characters and above'),
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password')
      .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
      .matches(/[@#$%^&*(),.?"{}|!<>]/).withMessage('Password must at least  containe one special character')     
  ];

  const loginValidationRules = () => [
    body('username').notEmpty().withMessage('Username is required'),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long')
      .matches(/[@#$%^&*(),.?"{}|!<>]/).withMessage('Password must at least  containe one special character')
  ];



router.post('/signup', userValidationRules, controllers.signup);
router.get('/login',loginValidationRules, controllers.login);



router
    .route('/')
    .get(auth.auth, auth.isAdmin, getAllUsers)
    .post(controllers.signup);

    router
    .route('/:id')
    .get(auth.auth,controllers.getUser)
    .patch(auth.auth, auth.isAdmin, updateUser)
    .delete(auth.auth, auth.isAdmin, deleteUser);

