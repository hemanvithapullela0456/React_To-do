const express = require("express");
const UserRoutes = express.Router();
const {
  signUp,
  signIn,
  forgotPassword,
  getUserData,
} = require("../controllers/userController");
const auth = require("../middlewares/auth");

UserRoutes.post("/signup", signUp);
UserRoutes.post("/signin", signIn);
UserRoutes.post("/forgotpassword", auth, forgotPassword);
UserRoutes.get("/getUserData", auth, getUserData);

module.exports = UserRoutes;
