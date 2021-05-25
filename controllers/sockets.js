const Users = require("../models/users");
const Message = require("../models/message");

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

const getUsers = async () => {
  const users = await Users.find().sort("-online");

  return users;
};

const saveMessage = async (payload) => {
  try {
    const message = new Message(payload);
    await message.save();
    return message;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = {
  UserConnect,
  UserDisconnect,
  getUsers,
  saveMessage,
};
