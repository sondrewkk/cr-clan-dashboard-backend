// eslint-disable-next-line new-cap
const router = require('express').Router();
const authorize = require('../middleware/authorize');
const clanService = require('./clan.service');
const Role = require('../_helpers/role');

// API routes
router.get('/:tag', authorize(Role.Member), getClan);
router.get('/:tag/members', authorize(Role.Member), getMembers);
router.post('/register', authorize(Role.Leader), registerClan);

module.exports = router;

// API Controllers
async function getClan(req, res, next) {
  try {
    const clan = await clanService.getClan(req.params.tag);

    if(clan) {
      res.json(clan);
    } 
    else {
      res.status(400).json({message: 'Clan could not be found'});
    }
  } 
  catch (err) {
    next(err);
  }
}

async function getMembers(req, res, next) {
  try {
    const members = await clanService.getMembers(req.params.tag);

    if(members) {
      res.json(members);
    } 
    else {
      res.status(400).json({message: 'No members found'});
    }
  } 
  catch (err) {
    next(err);
  }
}

async function registerClan(req, res, next) {
  try {
    const clanId = await clanService.register(req.body);

    if(clanId) {
      res.json(clanId);
    } 
    else {
      res.status(400).json({message: 'Clan could not be registered'});
    }
  } 
  catch (err) {
    next(err);
  }
}
