const express = require("express");
const userController = require("../controllers/users/registerUser");
const loginUser = require("../controllers/users/loginUser");
const { ensureToken } = require("../utils/jwtUtils");

const router = express.Router();

router.post(
  "/add",
  ensureToken(['administrator']),
  userController.registerUser
);

router.post("/login", loginUser.login);

module.exports = router;
