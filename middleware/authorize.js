const jwt = require('express-jwt');
const Role = require('../_helpers/role');

/**
 * 
 * @param {*} role 
 * @return {*}
 */
function authorize(role) {
  return [
    // authenticate JWT token and attach user to request object (req.user)
    jwt({ secret: process.env.TOKEN_SECRET }),

    // authorize based on user role. user.role can not be less that role to get authorized
    (req, res, next) => {
      if (Role[req.user.role] < role) {
        return res.status(401).json({ message: 'Not enough permissions. Role: ' + Role.toString(req.user.role) });
      }

      // authentication and authorization successful
      next();
    },
  ];
}

module.exports = authorize;
