const router = require('express').Router();
const client = require('../../client');
const verifyToken = require('../../middleware/verifyToken');
const Clan = require('../../models/clan');
const ClanMember = require('../../models/clanMember');
const {createClanValidation} = require('../../validation');

router.get('/:tag', verifyToken, async (req, res) => {
  const tag = req.params.tag;

  try {
    const clan = await Clan.findOne({ tag: tag }).populate('members');

    if(clan) {
      res.send(clan)
    } 
    else {
      res.send("Clan is not registered. A leader need to register the clan to start managing it.")
    }
    
  } catch (err) {
    console.error(err);
  }
});

router.get('/:tag/members', verifyToken, async (req, res) => {
  const tag = req.params.tag;

  try {
    const clan = await Clan.findOne({ tag: tag }).populate('members');

    if(clan) {
      res.send(clan.members)
    } 
    else {
      res.send("Clan is not registered. A leader need to register the clan to start managing it.")
    }
    
  } catch (err) {
    console.error(err);
  }
});

router.post('/register', verifyToken, async (req, res) => {
  try {
    // Validate request body, return error message if validation fails
    const {error} = createClanValidation(req.body);

    if(error) {
      return res.status(400).send(error.details[0].message);
    }

    // Check if clan already exist
    const clan = await Clan.findOne({ tag: req.body.tag });

    // Give a feedback message if it exist
    if(clan) {
      res.send("Clan already created")
    } 
    else {

      // Fetch clan data, put members in a separate object to pass
      // mongoose validation
      const newClanData = await client.Clans.getData(req.body.tag);
      const newClanMembers = newClanData.members;
      delete newClanData.members;

      // Create clan based on clan data, minus members
      const newClan = new Clan(newClanData);
      newClan.creator = req.body.creator;

      // For each member create a clan member and save it to database
      // before adding the member to the clan
      for(memberData in newClanMembers)
      {
        const member = new ClanMember(newClanMembers[memberData]);   
        member.clanTag = newClan.tag;

        await member.save();
        
        newClan.members.push(member._id);
      }

      // Save clan with members
      await newClan.save();

      // Return the id of the newly created clan 
      res.send(newClan._id);
    }
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;