const admin = require("../firebaseAdmin");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const firebaseLogin = async (req, res) => {
  try {
    const { token } = req.body;

    const decoded = await admin.auth().verifyIdToken(token);

    let user = await User.findOne({ email: decoded.email });

    if (!user) {
      user = await User.create({
        name: decoded.name || "Google User",
        email: decoded.email,
        role: "staff",
      });
    }

    const jwtToken = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token: jwtToken });
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Invalid Firebase token" });
  }
};

module.exports = firebaseLogin;
