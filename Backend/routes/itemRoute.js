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

router
  .route("/")
  .get(protect, getItems)                
  .post(protect, adminOnly, addItem);    

router
  .route("/:id")
  .put(protect, adminOnly, updateItem)   
  .delete(protect, adminOnly, deleteItem);

module.exports = router;
