const express = require("express");
const { registerUser, loginUser, getAllUsers } = require("../controllers/userControllers");
const { authUser } = require("../middleware/authUser");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("").get(authUser, getAllUsers);

module.exports = router;