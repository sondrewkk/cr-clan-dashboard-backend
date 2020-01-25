const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  let token = req.header('Authorization');

  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);

    try {
      const verified = jwt.verify(token, process.env.TOKEN_SECRET);
      req.user = verified;
      next();
    } 
    catch (err) {
      res.status(400).send('Invalid token');
    }
  } 
  else {
    return res.status(401).send('Bearer token is not supplied');
  }
};
