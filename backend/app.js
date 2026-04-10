const express = require('express');
const cors    = require('cors');
const path    = require('path');
const fs      = require('fs');
require('dotenv').config();

const carrosRoutes = require('./routes/carros');

const app  = express();
const PORT = process.env.PORT || 3001;

// Garante que a pasta de uploads existe
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// Serve as imagens em /uploads
app.use('/uploads', express.static(uploadDir));

app.use('/api/carros', carrosRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ erro: 'Erro interno no servidor' });
});

app.listen(PORT, () => {
  console.log(`Backend rodando em http://localhost:${PORT}`);
});
