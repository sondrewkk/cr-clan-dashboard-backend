
const roles = {
  Admin: 6,
  Leader: 5,
  CoLeader: 4,
  Elder: 3,
  Member: 2,
  User: 1,
};

const Admin = roles.Admin;
const User = roles.User;
const Leader = roles.Leader;
const CoLeader = roles.CoLeader;
const Elder = roles.Elder;
const Member = roles.Member;

/**
 * 
 * @param {*} role 
 * @return {*} role as string
 */
function toString(role) {
  for (const key in roles) {
    if (roles[key] === role) {
      return uppercaseFirstLetter(key);
    }
  }
}

/**
 * 
 * @param {string} string
 * @return {*} 
 */
function uppercaseFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = {
  Admin,
  Leader,
  CoLeader,
  Elder,
  Member,
  User,
  toString,
  uppercaseFirstLetter,
};
