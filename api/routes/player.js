const router = require('express').Router();
const client = require('../../client');
const verifyToken = require('../../middleware/verifyToken');

router.get('/:tag', verifyToken, async (req, res) => {
  const tag = req.params.tag;

  try {
    const player = await client.Users.getProfile(tag);
    res.send(player);
  } catch (err) {
    console.error(err);
  }
});

router.get('/:tag/chests', verifyToken, async (req, res) => {
  const tag = req.params.tag;

  try {
    const chests = await client.Users.getChests(tag);
    res.send(chests);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
