const express = require("express");
const userController = require("../controller/registerUser");
const loginUser = require("../controller/loginUser");
const AllUsers = require("../controller/getUsers");
const { ensureToken } = require("../jwtUtils");

const router = express.Router();

router.post(
  "/add",
  (req, res, next) => {
    console.log(req.body);
    next();
  },
  userController.registerUser
);

router.get("/all", ensureToken, AllUsers.getUsers);
router.post("/login", loginUser.login);

module.exports = router;
