const express = require("express");
const {
  registerController,
  loginController,
  forgotPasswordController,
  updateProfileController,
} = require("../controllers/authController.js");
const { isAdmin, requireSignIn } = require("../middlewares/authMiddleware.js");

const router = express.Router();

// Register || METHOD POST
router.post("/register", registerController);

// Login || POST
router.post("/login", loginController);

// Forgot Password || POST
router.post("/forgot-password", forgotPasswordController);

// Protected route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

// Protected Admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

// Update profile
router.put("/profile", requireSignIn, updateProfileController);

module.exports = router;
