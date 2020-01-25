// eslint-disable-next-line new-cap
const router = require('express').Router();
const authorize = require('../middleware/authorize');
const userSerivce = require('./user.service');
const Role = require('../_helpers/role');

// API routes
router.post('/login', login);
router.post('/register', register);
router.post('/verify', authorize(Role.User), verify);
module.exports = router;

// API Controllers

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function login(req, res, next) {
  try {
    const user = await userSerivce.authenticate(req.body);

    if (user) {
      res.json(user);
    } 
    else {
      res.status(400).json({ message: 'Login failed' });
    }
  } 
  catch (err) {
    next(err);
  }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function register(req, res, next) {
  try {
    const userId = await userSerivce.register(req.body);

    if (userId) {
      res.json(userId);
    }
    else {
      res.status(400).json({ message: 'Register user failed' });
    }
  } 
  catch (err) {
    next(err);
  }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function verify(req, res, next) {
  try {
    const verificationInfo = await userSerivce.verify(req.body);

    if (verificationInfo) {
      res.json(verificationInfo);
    }
    else {
      res.status(400).json({ message: 'Verify user failed' });
    }
  } 
  catch (err) {
    next(err);
  }
}
