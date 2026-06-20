const express = require("express");

const upload =require("../middleware/upload");

const {
  sendOTP,
  verifyOTP,
  login,
  forgotPassword,
  resetPassword,
  getProfile,
  updateProfile,
  changePassword,
  deleteAccount,
  refreshToken,
  logout,
  uploadProfilePicture
} = require("../controllers/authController");

const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();


// ================= Registration =================
router.post("/send-otp", sendOTP);

router.post("/verify-otp", verifyOTP);


// ================= Login =================
router.post("/login", login);

router.post("/refresh-token", refreshToken);

router.post("/logout", logout);


// ================= Forgot Password =================
router.post("/forgot-password", forgotPassword);

router.post("/reset-password", resetPassword);


// ================= Profile =================
router.get("/profile", verifyToken, getProfile);

router.put("/profile", verifyToken, updateProfile);


// ================= Change Password =================
router.put("/change-password", verifyToken, changePassword);

// upload profile pic
router.put("/upload-profile-picture",verifyToken,upload.single("profilePic"),uploadProfilePicture);

// ================= Delete Account =================
router.delete("/delete-account", verifyToken, deleteAccount);


module.exports = router;

