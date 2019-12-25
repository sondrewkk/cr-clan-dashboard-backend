// eslint-disable-next-line new-cap
const router = require('express').Router();
const User = require('../../models/user');
const Player = require('../../models/player');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {registerValidation, loginValidation} = require('../../validation');
const verifyToken = require('../../middleware/verifyToken');

router.post('/register', async (req, res) => {
  const {error} = registerValidation(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // Check if user is already in the db
  const emailExist = await User.findOne({email: req.body.email});

  if (emailExist) {
    return res.status(400).send('Email already exist');
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    await user.save();
    res.send({user: user._id});
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/login', async (req, res) => {
  const {error} = loginValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const user = 
    await User.findOne({email: req.body.email}).populate('playerProfile');
    
  if (!user) {
    return res.status(400).send('Email is not found');
  }

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) {
    return res.status(400).send('Invalid password');
  }

  const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
  res.json({
    success: true,
    massage: 'Authorization successful',
    isVerified: user.verified,
    token: token,
    userId: user._id,
    playerProfile: user.playerProfile,
  });
});

router.post('/verify', verifyToken, async (req, res) => { // LL2Y89V9
  const id = req.body.id;

  if (id) {   
    try {
      const user = await User.findOne({_id: id});
      
      if (!user.verified) {
        const player = await Player.findOne({ tag: req.body.tag})

        // Can this be a candidate for a virtual property? 
        // It`s based on playerProfile having data or not (null)
        user.verified = true; 
        user.playerProfile = player._id;
        
        await user.save();
      }

      res.json({
        success: true,
        message: 'Verified',
        id: user._id,
        verified: user.verified,
      });  
    } catch (err) {
      res.status(500).send(err.message);
    }
  } else {
    res.status(401).send('Invalid user id');
  }
});

module.exports = router;
