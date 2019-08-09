// eslint-disable-next-line new-cap
const router = require('express').Router();
const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
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

  const user = await User.findOne({email: req.body.email});
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
  });
});

module.exports = router;
