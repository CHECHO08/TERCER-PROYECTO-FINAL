// Importar Express
const express = require("express");
const cors = require("cors");
const dbCONN = require("./database/db");

// Ver puerto de entorno
console.log(process.env.PORT);

// Crear servidor
const app = express();

// Conectar a MongoDB
dbCONN();

// Configurar CORS
app.use(cors());

// Lectura del body
app.use(express.json());

// Rutas
app.use("", require("./routes/inventario"));

// Puerto
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor en el puerto ${PORT}`);
});

