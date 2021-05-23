const { response } = require("express");
const User = require("../models/users");

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

    //Encrypt Password

    //Save User
    const usuario = new User(req.body);
    await usuario.save();

    res.json({ usuario });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error al crear usuraio",
    });
  }
};

const Login = async (req, res = response) => {
  const { email, password } = req.body;

  res.json({
    ok: true,
    msg: "Login",
    email,
    password,
  });
};

const RenewToken = async (req, res = response) => {
  res.json({
    ok: true,
    msg: "Renew",
  });
};

module.exports = {
  CreateUser,
  Login,
  RenewToken,
};
