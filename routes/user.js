const express = require("express");
const {
  registerNewUser,
  resetPassword,
  updatePassword,
  uploadImage,
} = require("../controllers/userController");
const multer = require("multer");

const router = express.Router();
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + ".png");
  },
});
const upload = multer({ storage, limits: { fileSize: "10mb" } });
router.post("/register", registerNewUser);
router.post("/reset-password", resetPassword);
router.patch("/updatePassword", updatePassword);
router.patch("/:id/image", upload.single("userImage"), uploadImage);

module.exports = router;
