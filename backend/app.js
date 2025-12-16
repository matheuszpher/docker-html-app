const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Em memória (suficiente para o que os slides testam)
let items = [
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2" },
];

app.get("/", (req, res) => {
  res.send("Welcome to the Node.js API!");
});

app.get("/items", (req, res) => {
  res.json(items);
});

app.post("/items", (req, res) => {
  const newItem = req.body;
  const created = { id: items.length + 1, ...newItem };
  items.push(created);
  res.status(201).json({ message: "Item added successfully!", item: created });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
