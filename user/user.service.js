// eslint-disable-next-line new-cap
const User = require('../models/user');
const Player = require('../models/player');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Role = require('../_helpers/role');
const Client = require('../client');
const {registerValidation, loginValidation, verifyValidation} = require('../validation');

module.exports = {
  authenticate,
  register,
  verify
};

async function authenticate({ email, password }) {

  // Validate input
  const {error} = loginValidation({ email, password });
  
  if (error) {
    throw new Error(error.details[0].message);
  }

  // Get user from db
  const user = await User.findOne({email: email});
    
  if (!user) {
    throw new Error('Email is not found');
  }

  // Comapare stored password against input password
  const validPass = await bcrypt.compare(password, user.password);
  
  if (!validPass) {
    throw new Error('Invalid password');
  }

  // Create token and extract properties to return
  const token = jwt.sign({sub: user._id, role: user.role}, process.env.TOKEN_SECRET);
  const { verified, _id, playerProfile } = user;

  let tag = null;

  if(user.playerProfile !== null) {
    const player = await Player.findById(playerProfile)
    tag = player.tag;
  }
  
  return { verified, _id, tag, token};
}  

async function register(data) {

  // Validate input
  const {error} = registerValidation(data);

  if (error) {
    throw new Error(error.details[0].message);
  }

  // Extract name, email and password
  const { name, email, password } = data;

  // Check if user is already in the db
  const emailExist = await User.findOne({email: email});

  if (emailExist) {
    throw new Error('Email already exist');
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create the new user
  const user = new User({
    name: name,
    email: email,
    password: hashedPassword,
  });

  // Save new user
  await user.save();

  return user._id;
}

async function verify(data) {

  // Validate input
  const {error} = verifyValidation(data);

  if (error) {
    throw new Error(error.details[0].message);
  }

  // Extract id and tag
  const { id, tag } = data;

  // Find user in db
  const user = await User.findOne({_id: id});

  // If the user is found the verify process can proceed
  if(user) {

    // If the user is already verified throw an error
    if(user.verified) {
      throw new Error('User is already verified');
    }

    // Check id player exist in db
    const player = await Player.findOne({ tag: tag })

    // If not create player
    if (!player) {

      // Get player data from royale api and create player object
      const newPlayerData = await Client.Users.getProfile(tag);
      const newPlayer = new Player(newPlayerData);
      
      // Save player
      await newPlayer.save();

      // Link player profile to the user
      user.playerProfile = newPlayer._id;

      // When player is created or already exist set verified to true 
      user.verified = true; 

      // Set user role to player role if user is not admin
      if(Role[user.role] !== Role.Admin) {
        user.role = Role.uppercaseFirstLetter(newPlayer.clan.role);
      }
      
      // Save user
      await user.save();
    }
    else {
      throw new Error('Player is already added to database');
    }
  }
  else {
    throw new Error('User id does not exist');
  }
  
  // Extract properties to return
  const { verified, role, playerProfile } = user;

  return { tag, role, playerProfile, verified };
}
