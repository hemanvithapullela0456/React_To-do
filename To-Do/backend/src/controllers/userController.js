const user = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const key = process.env.SECRET_KEY;
console.log(key);
const saltRounds = 10;

async function signUp(req, res) {
  const { name, username, email, password } = req.body;

  const isThisUserExist = await user.findOne({ username: username });

  if (isThisUserExist) {
    res.send({
      status: false,
      message: "You are already registered!",
    });
  } else {
    var hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new user({
      name: name,
      username: username,
      email: email,
      password: hashedPassword,
      date: new Date(),
    });

    if (newUser.save()) {
      res.send({
        status: true,
        message: "Account creation successful",
      });
    }
  }
}
async function signIn(req, res) {
  const { username, password } = req.body;

  const existingUser = await user.findOne({ username: username });
  console.log(existingUser);

  if (!existingUser) {
    res.send({
      status: false,
      message: "No account found!",
    });
  } else {
    const checkPwd = await bcrypt.compare(password, existingUser.password);

    const token = jwt.sign({ id: existingUser._id, username: username }, key);
    console.log(token);

    if (checkPwd) {
      res.send({
        status: true,
        message: "Authentication successful", // for signIn response purpose
        token: token,
        userData: existingUser,
      });
    } else {
      res.send({
        status: false,
        message: "Incorrect Password!",
      });
    }
  }
}

async function forgotPassword(req, res) {}

async function getUserData(req, res) {
  const username = req.username;
  if (username) {
    const userData = await user.findOne({ username: username });
    if (userData) {
      res.json({
        status: true,
        data: userData,
      });
    } else {
      res.json({
        status: false,
        message: "Unauthorized",
      });
    }
  }
}

module.exports = { signUp, signIn, forgotPassword, getUserData };
