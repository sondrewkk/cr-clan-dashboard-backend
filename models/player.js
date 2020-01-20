const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  tag: { type: String },
  name: { type: String },
  trophies: { type: Number },
  arena: 
  {
    id: { type: Number },
    name: { type: String },
    arena: { type: String },
    trophyLimit: { type: Number }
  },
  clan: 
  {
    tag: { type: String },
    name: { type: String },
    role: { type: String },
    donations: { type: Number },
    donationsReceived: { type: Number },
    donationsDelta: { type: Number }
  },
  stats: 
  {
    clanCardsCollected: { type: Number },
    tournamentCardsWon: { type: Number },
    maxTrophies: { type: Number },
    threeCrownWins: { type: Number },
    cardsFound: { type: Number },
    totalDonations: { type: Number },
    challengeMaxWins: { type: Number },
    challengeCardsWon: { type: Number },
    level: { type: Number }
  },
  games: 
  {
    total: { type: Number },
    tournamentGames: { type: Number },
    wins: { type: Number },
    warDayWins: { type: Number },
    winsPercent: { type: Number },
    losses: { type: Number },
    lossesPercent: { type: Number },
    draws: { type: Number },
    drawsPercent: { type: Number }
  },
  leagueStatistics: 
  {
    currentSeason: {
      trophies: { type: Number },
      bestTrophies: { type: Number }
    },
    previousSeason: 
    {
      id: { type: String },
      trophies: { type: Number },
      bestTrophies: { type: Number }
    },
    bestSeason: 
    {
      id: { type: String },
      rank: { type: Number },
      trophies: { type: Number }
    }
  },
  deckLink: { type: String },
  _cacheTime: { type: Number },
  createdAt: { type: Date , default: Date.now, immutable: true },
  modified: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Player', playerSchema);
