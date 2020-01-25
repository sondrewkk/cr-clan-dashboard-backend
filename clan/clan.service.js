const client = require('../client');
const Clan = require('../models/clan');
const ClanMember = require('../models/clanMember');
const { createClanValidation } = require('../validation');

module.exports = {
  getClan,
  getMembers,
  register,
};

/**
 * 
 * @param {*} tag 
 */
async function getClan(tag) {
  const clan = await Clan.findOne({ tag: tag });

  if (clan) {
    return clan;
  } 
  else {
    throw new Error('Clan is not registered. A leader need to register the clan to start managing it.');
  }
}

/**
 * 
 * @param {*} tag 
 */
async function getMembers(tag) {
  const clan = await Clan.findOne({ tag: tag }).populate('members');

  if (clan) {
    return clan.members;
  } 
  else {
    throw new Error('Clan is not registered. A leader need to register the clan to start managing it.');
  }
}

/**
 * 
 * @param {*} data 
 */
async function register(data) {
  // Validate request body, return error message if validation fails
  const { error } = createClanValidation(data);

  if (error) {
    throw new Error(error.details[0].message);
  }

  const { tag, creator } = data;

  // Check if clan already exist
  const clan = await Clan.findOne({ tag: tag });

  // Give a feedback message if it exist
  if (clan) {
    throw new Error('Clan already created');
  } 
  else {
    // Fetch clan data, put members in a separate object to pass
    // mongoose validation
    const newClanData = await client.Clans.getData(tag);
    const newClanMembers = newClanData.members;
    delete newClanData.members;

    // Create clan based on clan data, minus members
    const newClan = new Clan(newClanData);
    newClan.creator = creator;

    // For each member create a clan member and save it to database
    // before adding the member to the clan
    for (memberData in newClanMembers) {
      if (memberData != null) {
        const member = new ClanMember(newClanMembers[memberData]);   
        member.clanTag = newClan.tag;
  
        await member.save();
        
        newClan.members.push(member._id);
      }
    }

    // Save clan with members
    await newClan.save();

    // Return the id of the newly created clan 
    return newClan._id;
  }
}
