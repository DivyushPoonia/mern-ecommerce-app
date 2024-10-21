const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  authMiddleware,
} = require("../controllers/authController.js");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/check-auth", authMiddleware, (req, res) => {
  const user = req.user;
  res.json({
    success: true,
    message: "Authenticated user",
    user: user,
  });
});

module.exports = router;
