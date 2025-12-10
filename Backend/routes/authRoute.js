const express = require("express");
const jwt = require("jsonwebtoken");
const { registerUser, loginUser } = require("../controllers/authController");
const firebaseLogin = require("../controllers/firebaseAuthController");


const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.post("/firebase-login", firebaseLogin);

module.exports = router;
