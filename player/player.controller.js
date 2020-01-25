// eslint-disable-next-line new-cap
const router = require('express').Router();
const authorize = require('../middleware/authorize');
const playerSerivce = require('./player.service');
const Role = require('../_helpers/role');

// API routes
router.get('/:tag', authorize(Role.Member), getPlayer);
router.post('/', authorize(Role.User), createPlayer);
router.get('/:tag/chests', authorize(Role.Member), getPlayerChests);

module.exports = router;

// API Controllers
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function getPlayer(req, res, next) {
  try {
    const player = await playerSerivce.getPlayer(req.params.tag);

    if (player) {
      res.json(player);
    } 
    else {
      res.status(400).json({ message: 'Player could not be found' });
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
async function createPlayer(req, res, next) {
  try {
    const playerId = await playerSerivce.createPlayer(req.body.tag);

    if (playerId) {
      res.json({ playerId });
    } 
    else {
      res.status(400).json({ message: 'Could not create player. Check tag.' });
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
async function getPlayerChests(req, res, next) {
  try {
    const chests = await playerSerivce.getPlayerChests(req.params.tag);

    if (chests) {
      res.json(chests);
    }
    else {
      res.status(400).json({ message: 'Could not get player chests. Check tag.' });
    }
  } 
  catch (err) {
    next(err);
  }
}
