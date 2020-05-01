var RegisterRouter = require("express").Router();
var User = require("../models/users");
var RegisterValidation = require("../registervalidation");
var bcrypt = require("bcryptjs");

RegisterRouter.post("/register", async (req, res) => {
  //validation call

  const { error } = RegisterValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //pre existance of lawra

  const EmailExists = await User.findOne({
    email: req.body.email
  });
  if (EmailExists)
    return res.status(400).send("too many users with same email");

  //psswd hashing and salting

  const salt = await bcrypt.genSalt(10);
  const hashPasswd = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPasswd,
    date: Date.now()
  });
  try {
    const saveuser = await user.save();
    res.send("saved user successfully");
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = RegisterRouter;
