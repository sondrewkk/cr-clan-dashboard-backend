const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const clanSchema = new mongoose.Schema({
  _cacheTime: { type: Number },
  creator: { type: String },
  createdAt: { type: Date, default: Date.now, immutable: true },
  tag: { type: String },
  name: { type: String },
  description: { type: String },
  type: { type: String },
  score: { type: Number },
  warTrophies: { type: Number },
  memberCount: { type: Number },
  requiredScore: { type: Number },
  donations: { type: Number },
  badge: { type: String },
  location: {
    name: { type: String },
    isCountry: { type: Boolean },
    code: { type: String }
  },
  members: [{ type: ObjectId, ref: 'ClanMember'}],
  tracking: {
    active: { type: Boolean },
    legible: { type: Boolean },
    available: { type: Boolean },
    snapshotCount: { type: Number }
  }
});

module.exports = mongoose.model('Clan', clanSchema);