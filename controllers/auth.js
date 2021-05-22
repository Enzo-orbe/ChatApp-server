const { response } = require("express");
const { validationResult } = require("express-validator");

const CreateUser = async (req, res = responses) => {
  res.json({
    ok: true,
    msg: "NEW",
  });
};

const Login = async (req, res = response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.mapped(),
    });
  }

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
