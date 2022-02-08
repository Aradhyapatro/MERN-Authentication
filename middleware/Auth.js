const jwt = require("jsonwebtoken");
const Users = require("../models/User");
const errorResponse = require("../utils/errorResponse");

module.exports = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    next(new errorResponse("token Not Found", 401));
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    const user = await Users.findById(decode.id);

    if (!user) {
      next(new errorResponse("No Such User Found"));
    }

    req.user = user;
    next();
  } catch (error) {
    next(new errorResponse(error, 401));
  }
};
