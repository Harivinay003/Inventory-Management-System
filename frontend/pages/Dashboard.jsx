import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Dashboard.css";

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [loading, setLoading] = useState(false);
  const [userRole, setUserRole] = useState("");

  const token = localStorage.getItem("token");

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/items", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems(res.data);
    } catch {
      toast.error("Failed to load items");
    }
    setLoading(false);
  };

  const fetchUserRole = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/protected", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserRole(res.data.user.role);
    } catch {
      toast.error("User auth failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/items",
        { name, quantity },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Item added!");
      setName("");
      setQuantity("");
      fetchItems();
    } catch {
      toast.error("Failed to add item");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/items/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.info("Item deleted");
      fetchItems();
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleUpdate = async (id) => {
    const newName = prompt("New name:");
    const newQuantity = prompt("New quantity:");
    if (!newName || !newQuantity) return;
    try {
      await axios.put(
        `http://localhost:5000/api/items/${id}`,
        { name: newName, quantity: newQuantity },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Item updated");
      fetchItems();
    } catch {
      toast.error("Update failed");
    }
  };

  useEffect(() => {
    fetchItems();
    fetchUserRole();
  }, []);

  return (
    <div className="container">
      <h2>📦 Inventory Dashboard</h2>

      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Item Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
        <button type="submit">Add Item</button>
      </form>

      {loading ? (
        <p>🔄 Loading...</p>
      ) : items.length === 0 ? (
        <p>No items yet.</p>
      ) : (
        <ul className="item-list">
          {items.map((item) => (
            <li key={item._id} className="item">
              <span>
                {item.name} — {item.quantity}
              </span>
              <div className="item-actions">
                <button onClick={() => handleUpdate(item._id)}>✏️</button>
                {userRole === "admin" && (
                  <button onClick={() => handleDelete(item._id)}>🗑️</button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default Dashboard;
