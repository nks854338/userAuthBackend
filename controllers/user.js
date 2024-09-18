const { v4: uuidv4 } = require("uuid");
const User = require("../models/user");
const { setUser } = require("../service/auth");

async function landing(req, res) {
  try {
    const getAllUsers = await User.find({ "name": "nk",});
    res.status(201).send(getAllUsers);
  } catch (error) {
    res.status(400).send(error);
  }
}

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

  res.cookie("uid", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', 
    sameSite: 'None',
  });

  return res.json({ token });
}

module.exports = {
  landing,
  handleUserSignUp,
  handleUserLogin,
};
