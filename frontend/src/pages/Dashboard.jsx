import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Dashboard.css";

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [itemId, setItemId] = useState("");
  const [name, setName] = useState("");
  const [stockQty, setStockQty] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [supplierId, setSupplierId] = useState("");
  const [loading, setLoading] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [editingItemId, setEditingItemId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const token = localStorage.getItem("token");

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/items", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load items");
    }
    setLoading(false);
  };

  const fetchUserRole = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/protected", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const role = res.data?.role;

      if (!role) {
        console.warn("No role found in /api/protected response:", res.data);
        setUserRole("");
        return;
      }

      setUserRole(role);
    } catch (err) {
      console.error("Error fetching user role:", err);
      toast.error("User auth failed");
      setUserRole("");
    }
  };

  const clearForm = () => {
    setEditingItemId(null);
    setItemId("");
    setName("");
    setStockQty("");
    setUnitPrice("");
    setSupplierId("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingItemId) {
        await axios.put(
          `http://localhost:5000/api/items/${editingItemId}`,
          {
            itemId,
            name,
            quantity: stockQty,
            unitPrice,
            supplierId,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        toast.success("Item updated");
      } else {
        await axios.post(
          "http://localhost:5000/api/items",
          {
            itemId,
            name,
            quantity: stockQty,
            unitPrice,
            supplierId,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        toast.success("Item added");
      }

      clearForm();
      fetchItems();
    } catch (err) {
      console.error(err);
      toast.error("Operation failed");
    }
  };

  const handleRowClick = (item) => {
    if (userRole !== "admin") return;

    setEditingItemId(item._id);
    setItemId(item.itemId || "");
    setName(item.name || "");
    setStockQty(item.quantity || "");
    setUnitPrice(item.unitPrice ?? "");
    setSupplierId(item.supplierId || "");
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/items/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.info("Item deleted");
      if (editingItemId === id) {
        clearForm();
      }
      fetchItems();
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  useEffect(() => {
    fetchItems();
    fetchUserRole();
  }, []);

  const filteredItems = items.filter((item) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      (item.name && item.name.toLowerCase().includes(term)) ||
      (item.itemId && item.itemId.toLowerCase().includes(term)) ||
      (item.supplierId && item.supplierId.toLowerCase().includes(term))
    );
  });

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Inventory Dashboard</h2>

      {userRole === "admin" ? (
        <form className="item-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Item ID</label>
              <input
                type="text"
                value={itemId}
                onChange={(e) => setItemId(e.target.value)}
                placeholder="Item ID"
              />
            </div>

            <div className="form-group">
              <label>Item Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Item Name"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Stock Quantity</label>
              <input
                type="number"
                value={stockQty}
                onChange={(e) => setStockQty(e.target.value)}
                placeholder="Stock Qty"
                required
              />
            </div>

            <div className="form-group">
              <label>Unit Price</label>
              <input
                type="number"
                step="0.1"
                value={unitPrice}
                onChange={(e) => setUnitPrice(e.target.value)}
                placeholder="Unit Price"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group full-width">
              <label>Supplier ID</label>
              <input
                type="text"
                value={supplierId}
                onChange={(e) => setSupplierId(e.target.value)}
                placeholder="Supplier ID"
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="add-btn">
              {editingItemId ? "Update Item" : "Add Item"}
            </button>
            {editingItemId && (
              <button
                type="button"
                className="cancel-btn"
                onClick={clearForm}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      ) : userRole === "staff" ? (
        <></>
      ) : (
        <></>
      )}

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="table-wrapper">
        {loading ? (
          <p className="info-text">Loading...</p>
        ) : items.length === 0 ? (
          <p className="info-text">No items yet.</p>
        ) : filteredItems.length === 0 ? (
          <p className="info-text">No items match your search.</p>
        ) : (
          <table className="item-table">
            <thead>
              <tr>
                <th>Item ID</th>
                <th>Name</th>
                <th>Stock Qty</th>
                <th>Unit Price</th>
                <th>Supplier ID</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr
                  key={item._id}
                  className={`table-row ${
                    userRole !== "admin" ? "row-readonly" : ""
                  }`}
                  onClick={() => handleRowClick(item)}
                >
                  <td>{item.itemId || "-"}</td>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.unitPrice ?? "-"}</td>
                  <td>{item.supplierId || "-"}</td>
                  <td>
                    {userRole === "admin" && (
                      <button
                        className="table-btn delete-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(item._id);
                        }}
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default Dashboard;
