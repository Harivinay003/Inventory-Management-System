const express = require("express");
const router = express.Router();
const {
  getItems,
  addItem,
  updateItem,
  deleteItem,
} = require("../controllers/itemController");

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

// All routes below require authentication
router.route("/")
  .get(protect, getItems)
  .post(protect, addItem);

router.route("/:id")
  .put(protect, updateItem)
  .delete(protect, adminOnly, deleteItem);  // 👈 Only admins can delete

  module.exports =router;