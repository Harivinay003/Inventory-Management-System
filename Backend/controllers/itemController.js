const Item = require("../models/Item");

// @desc Get all items for logged-in user
const getItems = async (req, res) => {
  const items = await Item.find({ user: req.user._id });
  res.status(200).json(items);
};

// @desc Create new item
const addItem = async (req, res) => {
  const { name, quantity} = req.body;

  if (!name || !quantity ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const item = await Item.create({
    name,
    quantity,
    user: req.user._id,
  });

  res.status(201).json(item);
};

// @desc Update item
const updateItem = async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (!item || item.user.toString() !== req.user._id.toString()) {
    return res.status(404).json({ message: "Item not found or not authorized" });
  }

  const updated = await Item.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.json(updated);
};

// @desc Delete item
const deleteItem = async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (!item || item.user.toString() !== req.user._id.toString()) {
    return res.status(404).json({ message: "Item not found or not authorized" });
  }

  await item.remove();
  res.json({ message: "Item deleted successfully" });
};

module.exports = {
  getItems,
  addItem,
  updateItem,
  deleteItem,
};
