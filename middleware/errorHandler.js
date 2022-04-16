const errorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  const error = { ...err };

  error.message = err.message;

  if (error.code === 11000) {
    const message = `Duplicate Feild Value Error`;
    error = new errorResponse(message, 400);
  }

  if (error.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new errorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "Server Error",
  });
};

module.exports = errorHandler;
