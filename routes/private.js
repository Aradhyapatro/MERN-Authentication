const express = require("express");
const router = express.Router();
const PrivateTokenVerification = require("../middleware/Auth");
const PrivateRoute = require("../controllers/private");

router.route("/").get(PrivateTokenVerification, PrivateRoute);

module.exports = router;
