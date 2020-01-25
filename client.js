const { Client } = require('croyale');

const client = new Client(process.env.API_TOKEN);

module.exports = client;
