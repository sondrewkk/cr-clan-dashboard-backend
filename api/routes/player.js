const router = require('express').Router();
const client = require('../../client');
const verifyToken = require('../../middleware/verifyToken');
const Player = require('../../models/player');

router.get('/:tag', verifyToken, async (req, res) => {
  const tag = req.params.tag;

  try {
    let player = await Player.findOne({tag: tag});

    if(player) {
      const timeLeftBeforeUpdate = player._cacheTime - Date.now();
      
      if(timeLeftBeforeUpdate <= 0){ // Update player if cachetime has run out
        const newPlayerData = await client.Users.getProfile(tag);
        
        player.overwrite(newPlayerData);
        player.modified = Date.now();
        
        await player.save();
      } 

      res.send(player); 
    } 
    else {
      const newPlayerData = await client.Users.getProfile(tag);
      const newPlayer = new Player(newPlayerData);

      newPlayer.created = Date.now();
      newPlayer.modified = Date.now();
      
      await newPlayer.save();

      res.send(newPlayer);
    }
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
