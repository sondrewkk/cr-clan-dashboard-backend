const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

require('./routes/user')(router);

module.exports = router;
