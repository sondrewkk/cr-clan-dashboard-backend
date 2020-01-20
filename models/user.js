const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    max: 255,
    min: 6,
  },
  email: {
    type: String,
    required: true,
    max: 255,
    min: 6,
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 6,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    default: 'User',
  },
  playerProfile: {
    type: ObjectId,
    ref: 'Player', 
    default: null, 
  },
  verified: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('User', userSchema);
