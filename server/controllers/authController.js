const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const registerUser = async (req, res) => {
  try {
    let { fullname, email, password } = req.body;
    email = email.toLowerCase();

    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create(
      new User({ fullname, email, password: hashedPassword })
    );

    if (!newUser) {
      res.status(400).json({ success: false, message: "Failed to register" });
    }
    res.status(201).json({ success: true, message: { fullname, email } });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to register" });
  }
};

const signinUser = async (req, res) => {
  try {
  } catch (err) {}
};

module.exports = { registerUser };
