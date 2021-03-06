const jwt = require("jsonwebtoken");
const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/AppError");
const bcrypt = require("bcryptjs");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmPassowrd: req.body.confirmPassowrd,
  });

  const token = signToken(newUser);

  res.status(201).json({
    status: "Success",
    token,
    data: {
      user: newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //console.log(email);

  //1) if email/pass exist
  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  //2) if user exists and password correct
  const user = await User.findOne({ email }).select("+password");
  //password isnt shown in db. so our User doesnt contain any pass feild. in order
  //to get unselected feild, we gotta use .select("+fieldName")
  //console.log(user);

  if (!user || !(await user.correctPassowrd(password, user.password))) {
    return next(new AppError("Incorrect email or password!", 401));
  }

  //3)all ok? send token to the client

  const token = signToken(user._id);
  res.status(200).json({
    status: "Success",
    token,
  });
});
