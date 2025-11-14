// Importar Express
const express = require("express");

// Ver puerto de entorno
console.log(process.env.PORT);

// Crear servidor
const app = express();

// Ruta principal
app.get("/", (req, res) => {
    //res.send("H");
    res.status(200).json({
        success: true,
        msg:"ok"
    })
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto 3000`);
});
