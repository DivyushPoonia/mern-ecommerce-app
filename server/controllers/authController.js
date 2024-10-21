const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const registerUser = async (req, res) => {
  try {
    let { fullname, email, password } = req.body;
    email = email.toLowerCase();

    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.json({
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
      return res
        .status(400)
        .json({ success: false, message: "Failed to register" });
    }
    res.status(201).json({ success: true, message: "User created" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Some error occured" });
  }
};

const loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;
    email = email.toLowerCase();

    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.json({
        success: false,
        message: "User doesn't exist",
      });
    }

    const checkPassword = await bcrypt.compare(password, checkUser.password);

    if (!checkPassword) {
      return res.json({
        success: false,
        message: "The password is incorrect",
      });
    }

    const secret = process.env.JWT_SECRET;
    const token = jwt.sign(
      {
        name: checkUser.fullname,
        email: checkUser.email,
        role: checkUser.role,
      },
      secret,
      { expiresIn: "2d" }
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false, // process.env.NODE_ENV === "production",
      })
      .json({
        success: true,
        message: "Logged in successfully",
        user: {
          name: checkUser.fullname,
          email: checkUser.email,
          role: checkUser.role,
          id: checkUser._id,
        },
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Some error occured" });
  }
};

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token || null;
    console.log("token -> ", token);
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user!",
      });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log(`decoded token - >`, decodedToken);
    req.user = decodedToken;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      success: false,
      message: "Unauthorized user!",
    });
  }
};

const logoutUser = (req, res) => {
  console.log("logout ");
  try {
    res
      .clearCookie("token")
      .send({ success: true, message: "logged out successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Some error occured" });
  }
};

module.exports = { registerUser, loginUser, logoutUser, authMiddleware };
