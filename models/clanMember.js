const mongoose = require('mongoose');

const clanMemberSchema = new mongoose.Schema({
    name: { type: String },
    tag: { type: String },
    rank: { type: Number },
    previousRank: { type: Number },
    role: { type: String },
    expLevel: { type: Number },
    trophies: { type: Number },
    lastSeen: { type: Date },
    donations: { type: Number },
    donationsReceived: { type: Number },
    donationsDelta: { type: Number },
    arena: {
      id: { type: Number },
      name: { type: String },
      arena: { type: String },
      trophyLimit: { type: Number }
    },
    donationsPercent: { type: Number }

    // Properties to add later
    // ranks: [ {type: Number }],
    // requirements: {
    //   donation: { type: Boolean },
    //   warBattles: { type: Boolean }
    // }
}, { collection: 'clanMembers' });

module.exports = mongoose.model('ClanMember', clanMemberSchema);