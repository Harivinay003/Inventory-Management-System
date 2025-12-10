const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    itemId: {
      type: String,
      required: [true, "Please add an item ID"],
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: [true, "Please add item name"],
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, "Please add stock quantity"],
      min: 0,
      default: 0,
    },
    unitPrice: {
      type: Number,
      required: [true, "Please add unit price"],
      min: 0,
      default: 0,
    },
    supplierId: {
      type: String,
      required: [true, "Please add supplier ID"],
      trim: true,
      default: "",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Item", itemSchema);
