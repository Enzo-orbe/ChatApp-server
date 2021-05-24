const Users = require("../models/users");

const UserConnect = async (uid) => {
  const user = await Users.findById(uid);
  user.online = true;

  await user.save();

  return user;
};

const UserDisconnect = async (uid) => {
  const user = await Users.findById(uid);
  user.online = false;

  await user.save();

  return user;
};

module.exports = {
  UserConnect,
  UserDisconnect,
};
