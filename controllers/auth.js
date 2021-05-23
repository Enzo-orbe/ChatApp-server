const { response } = require("express");
const Bcrypt = require("bcryptjs");
const User = require("../models/users");
const { GenerateToken } = require("../helpers/jwt");

const CreateUser = async (req, res = response) => {
  try {
    const { email, name, password } = req.body;

    //Verify Email
    const existEmail = await User.findOne({ email });
    if (existEmail) {
      return res
        .status(400)
        .json({ ok: false, msg: "El email ya se encuentra registrado" });
    }

    const users = new User(req.body);

    //Encrypt Password
    const salt = Bcrypt.genSaltSync();
    users.password = Bcrypt.hashSync(password, salt);

    //Save User
    await users.save();

    //generate Token
    const token = await GenerateToken(users.id);

    res.json({ ok: true, users, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error al crear usuario",
    });
  }
};

const Login = async (req, res = response) => {
  try {
    const { email, password } = req.body;

    const userDb = await User.findOne({ email });

    if (!userDb) {
      res.status(404).json({
        ok: false,
        msg: "Email o contraseña incorrectos",
      });
    }

    //Validate Password
    const validatePassword = Bcrypt.compareSync(password, userDb.password);

    if (!validatePassword) {
      return res.status(404).json({
        ok: false,
        msg: "Email o contraseña incorrectos",
      });
    }

    //Generate Token
    const token = await GenerateToken(userDb.id);

    res.json({
      ok: true,
      userDb,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error al iniciar sesion",
    });
  }
};

const RenewToken = async (req, res = response) => {
  const uid = req.uid;

  //Generate New Token
  const token = await GenerateToken(uid);

  //Get User
  const user = await User.findById(uid);

  res.json({
    ok: true,
    token,
    user,
  });
};

module.exports = {
  CreateUser,
  Login,
  RenewToken,
};
