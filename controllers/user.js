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

  // Setting cookie with SameSite=None and Secure attributes
  res.cookie("uid", token, {
    httpOnly: true, // Prevents JavaScript access
    secure: process.env.NODE_ENV === 'production', // Use secure cookies only in production
    sameSite: 'None', // Allows cookies in cross-site contexts
  });

  return res.json({ token });
}

module.exports = {
  handleUserSignUp,
  handleUserLogin,
};
