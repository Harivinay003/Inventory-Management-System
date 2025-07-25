const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add your name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user", // 👈 default role is staff unless changed manually
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
