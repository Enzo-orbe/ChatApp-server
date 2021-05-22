const { Router } = require("express");
const { check } = require("express-validator");

//Constrollers
const { CreateUser, Login, RenewToken } = require("../controllers/auth");

const router = Router();

//Create User
router.post("/new", CreateUser);

//Login
router.post(
  "/",
  [
    check("email", "El Email es obligatorio").isEmail(),
    check("password", "El Password es obligatorio").not().isEmpty(),
  ],
  Login
);

//Token
router.get("/renew", RenewToken);

module.exports = router;
