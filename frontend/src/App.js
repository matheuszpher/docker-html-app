import { useEffect, useState } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/items")
      .then((r) => r.json())
      .then(setItems)
      .catch((e) => console.error("Error fetching items:", e));
  }, []);

  const handleAddItem = () => {
    const item = { name: newItem };
    fetch("http://localhost:3000/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    })
      .then((r) => r.json())
      .then((data) => {
        setMessage(data.message);
        setItems((prev) => [...prev, data.item]);
        setNewItem("");
      })
      .catch((e) => console.error("Error adding item:", e));
  };

  return (
    <div>
      <h1>React App with Node.js API</h1>

      <h2>Items List</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id ?? item.name}>{item.name}</li>
        ))}
      </ul>

      <h2>Add New Item</h2>
      <input
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        placeholder="Enter item name"
      />
      <button onClick={handleAddItem}>Add Item</button>

      {message && <p>{message}</p>}
    </div>
  );
}

export default App;
