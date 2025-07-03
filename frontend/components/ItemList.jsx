import React from "react";

const ItemList = ({ items, onRefresh }) => {
  const token = localStorage.getItem("token");

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/items/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    onRefresh();
  };

  return (
    <div>
      <h3>Items</h3>
      {items.length === 0 && <p>No items yet.</p>}
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            <strong>{item.name}</strong> - {item.quantity} ({item.category}){" "}
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
