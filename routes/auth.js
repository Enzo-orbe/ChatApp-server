const { Router } = require("express");
const { check } = require("express-validator");

//Constrollers
const { CreateUser, Login, RenewToken } = require("../controllers/auth");
const { ValidateCamps } = require("../middlewares/ValidateCamps");
const { ValidateToken } = require("../middlewares/ValidateToken");

const router = Router();

//Create User
router.post(
  "/new",
  [
    check("email", "El Email es obligatorio").isEmail(),
    check("password", "La contraseña  es obligatoria").not().isEmpty(),
    check("name", "El Nombre es obligatorio").not().isEmpty(),
    ValidateCamps,
  ],
  CreateUser
);

//Login
router.post(
  "/",
  [
    check("email", "El Email es obligatorio").isEmail(),
    check("password", "El Contraseña es obligatoria").not().isEmpty(),
    ValidateCamps,
  ],
  Login
);

//Token
router.get("/renew", ValidateToken, RenewToken);

module.exports = router;
