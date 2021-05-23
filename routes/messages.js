const { Router } = require("express");
const { getChat } = require("../controllers/messages");
const { ValidateToken } = require("../middlewares/ValidateToken");

const router = Router();

router.get("/:from", ValidateToken, getChat);

module.exports = router;
