const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { createUserTable } = require('./models/userModel');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('../frontend')); // Servir archivos frontend

// Rutas
app.use('/api/auth', authRoutes);

// Ruta inicial
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: '../frontend' });
});

// Inicializar base de datos y servidor
const startServer = async () => {
  try {
    await createUserTable();
    console.log('✅ Tabla de usuarios verificada/creada');
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error al iniciar:', error);
  }
};

startServer();