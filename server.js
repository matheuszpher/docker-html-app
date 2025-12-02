const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Configura para servir o arquivo HTML no diretório atual
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`🚀 Aplicação rodando em http://localhost:${port}`);
});