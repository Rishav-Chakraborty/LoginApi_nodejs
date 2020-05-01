var LoginRouter = require("express").Router();
var User = require("../models/users");
var bcrypt = require("bcryptjs");
var Loginvalidation = require("../loginvalidation");
var jwt = require("jsonwebtoken");
LoginRouter.post("/login", async (req, res) => {
  const { error } = Loginvalidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const user = await User.findOne({
    email: req.body.email
  });
  if (!user) return res.status(400).send("email or password is incorrect");
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("email or password is incorrect");
  const tokenize = jwt.sign({ _id: user._id }, process.env.TOKEN);
  res.header("auth-token", tokenize);
  res.send("log in success");
});

module.exports = LoginRouter;
