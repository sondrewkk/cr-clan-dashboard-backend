
const roles = {
  Admin: 6,
  Leader: 5,
  CoLeader: 4,
  Elder: 3,
  Member: 2,
  User: 1,
}

const Admin = roles.Admin;
const User = roles.User;
const Leader = roles.Leader;
const CoLeader = roles.CoLeader;
const Elder = roles.Elder;
const Member = roles.Member;

function toString(role) {
  for(let key in roles) {
    if(roles[key] === role) {
      return uppercaseFirstLetter(key);
    }
  }
}

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
  uppercaseFirstLetter
}