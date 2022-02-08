const express = require("express");
const router = express.Router();

const {
  register,
  forgotPassword,
  login,
  resetPassword,
} = require("../controllers/auth.js");

router.route("/register").post(register);

router.route("/forgotpassword").post(forgotPassword);

router.route("/login").post(login);

router.route("/resetpassword/:token").put(resetPassword);

module.exports = router;
