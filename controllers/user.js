const { v4: uuidv4 } = require("uuid");
const User = require("../models/user");
const { setUser } = require("../service/auth");

async function handleUserSignUp(req, res) {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res
      .status(400)
      .send("Email already registered, please use a different one.");
  }

  await User.create({
    name,
    email,
    password,
  });

  return res.status(200).json({
    success: true,
    message: "User Created Successfully",
  });
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });

  if (!user) {
    return res.status(400).json({ error: "Invalid Username or Password" });
  }

  const token = setUser(user);
  res.cookie("uid", token);
  return res.json({ token });
}

async function getAllUser(req, res) {
  const user = await User.find({});
  res.status(201).send("all user", user);
}

module.exports = {
  handleUserSignUp,
  handleUserLogin,
  getAllUser,
};