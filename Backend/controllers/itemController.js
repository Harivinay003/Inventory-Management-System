const Item = require("../models/Item");

const getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (err) {
    console.error("Get items error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};
const addItem = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admin can add items" });
    }

    const { itemId, name, quantity, unitPrice, supplierId } = req.body;

    if (!name || quantity === undefined) {
      return res
        .status(400)
        .json({ message: "Name and quantity are required" });
    }

    const item = await Item.create({
      itemId,
      name,
      quantity,
      unitPrice,
      supplierId,
      user: req.user._id,
    });

    res.status(201).json(item);
  } catch (err) {
    console.error("Add item error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

const updateItem = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admin can update items" });
    }

    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    const updated = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(updated);
  } catch (err) {
    console.error("Update item error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteItem = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admin can delete items" });
    }

    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    await item.deleteOne();
    res.json({ message: "Item deleted successfully" });
  } catch (err) {
    console.error("Delete item error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getItems,
  addItem,
  updateItem,
  deleteItem,
};
