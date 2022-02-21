const crypto = require("crypto");
const User = require("../models/User");
const errorResponse = require("../utils/errorResponse");
const sendMail = require("../utils/sendEmail");

exports.register = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({
      username,
      email,
      password,
    });

    gettingToken(user, 201, res);
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new errorResponse("Please Enter a Email and Password", 400));
  }

  try {
    const user = await User.findOne({ email }).select("+password");
    const isMatch = await user.isPasswordMatch(password);
    console.log(isMatch);
    if (isMatch) {
      gettingToken(user, 200, res);
    } else {
      return next(new errorResponse("ValidationError", 400));
    }
  } catch (error) {
    return next(error);
  }
};

exports.forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  console.log(email);

  try {
    const user = await User.findOne({ email });

    if (!user) {
      next(new errorResponse("There is no such User"));
    }

    const tokenReset = user.getResetPasswordToken();
    await user.save();

    const resetURL = `http://localhost:${process.env.PORT}/api/auth/resetpassword/${tokenReset}`;

    const message = `
    <h1>You have requested to reset your password</h1>
    <p>Please click the below link to reset the password</p>
    <a href=${resetURL}>${resetURL}</a>
    `;

    try {
      sendMail({
        email: email,
        subject: "Password Reset",
        message: message,
      });

      res.status(200).json({
        success: true,
        data: "Reset Password link was send to email",
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpired = undefined;

      await user.save();

      next(
        new errorResponse("Error in Server Could not Change the password", 500)
      );
    }
  } catch (error) {
    next(error);
  }
};

exports.resetPassword = async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpired: { $gt: Date.now() },
    });

    if (!user) {
      next(new errorResponse("No reset Request"), 400);
    }

    const password = req.body.password;
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpired = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      declaration: "Password was reset",
    });
  } catch (error) {
    next(error);
  }
};

function gettingToken(user, statuscode, res) {
  const token = user.getToken();
  res.status(statuscode).json({ success: true, token });
}
