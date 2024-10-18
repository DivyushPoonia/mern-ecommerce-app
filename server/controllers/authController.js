const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const registerUser = async (req, res) => {
  try {
    let { fullname, email, password } = req.body;
    email = email.toLowerCase();

    const checkUser = await User.findOne({ email });
    if (checkUser) {
      res.json({
        success: false,
        message: "User already exists with this email",
      });
    }

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
    console.log(err);
    res.status(500).json({ success: false, message: "Some error occured" });
  }
};

const signinUser = async (req, res) => {
  try {
    let { email, password } = req.body;
    email = email.toLowerCase();

    console.log("password -> ", password);

    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      res.json({
        success: false,
        message: "User doesn't exists.",
      });
    }
    console.log("user -> ", checkUser);

    const checkPassword = await bcrypt.compare(password, checkUser.password);
    console.log("checkpassowrd -> ", checkPassword);

    if (!checkPassword) {
      res.json({
        success: false,
        message: "The password is incorrect",
      });
    }

    const secret = process.env.JWT_SECRET;
    const token = await jwt.sign(
      {
        name: checkUser.fullname,
        email: checkUser.email,
        role: checkUser.role,
      },
      secret,
      { expiresIn: "1hr" }
    );

    res.status(200).json({ success: true, token: token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Some error occured" });
  }
};

module.exports = { registerUser, signinUser };
