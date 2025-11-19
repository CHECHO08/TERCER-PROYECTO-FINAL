const { Schema, model } = require('mongoose');

// Definición de la estructura de la colección 'Libro'
const LibroSchema = Schema({
    titulo: {
        type: String,
        required: true,
    },
    autor: {
        type: String,
        required: true,
    },
    anio: {
        type: Number,
        required: true,
    },
    // Podrías agregar un campo para el usuario o la fecha de creación si lo necesitas
});

// Exportamos el modelo
module.exports = model('Libro', LibroSchema, 'inventario');

