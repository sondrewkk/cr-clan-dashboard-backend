const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  tag: {
    type: String,
  },
  name: {
    type: String,
  },
});

module.exports = mongoose.model('Player', playerSchema);
