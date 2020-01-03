const client = require('../client');
const Player = require('../models/player');

module.exports = {
  getPlayer,
  createPlayer,
  getPlayerChests
}

async function getPlayer(tag) {

  // Verify tag?

  // Get player from db
  let player = await Player.findOne({tag: tag});

  // If the player exist
  if(player) {

    // Calculate cached time to determine if player date need to be updated
    const timeLeftBeforeUpdate = player._cacheTime - Date.now();
    
    // Update player if cachetime has run out
    if(timeLeftBeforeUpdate <= 0){

      // Get player data from royale api
      const newPlayerData = await client.Users.getProfile(tag);
      
      // Overwrite old data
      player.overwrite(newPlayerData);

      // Update modified property
      player.modified = Date.now();
      
      // Save the updated player
      await player.save();
    } 

    // Return player 
    return player; 
  } 
  else {
    throw new Error('Player does not exist. Plyer tag might be wrong');
  }
}

async function createPlayer(tag) {

  // Get player for db
  const player = await Player.findOne({tag: tag});

  // Throw error if player already exist
  if(player) {
    throw new Error('Player does already exist');
  }

  // Get player data from royale api and create player
  const newPlayerData = await client.Users.getProfile(tag);
  const newPlayer = new Player(newPlayerData);
  
  // Save new player
  await newPlayer.save();

  return newPlayer._id;
}

async function getPlayerChests(tag) {

  // Get chest from royale api
  const chests = await client.Users.getChests(tag);
  
  return chests; 
}
