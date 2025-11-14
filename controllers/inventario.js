const { response } = require("express");
const Libro = require("../model/libro");  // CORRECCIÓN

const crearLibro = async (req, res = response) => {
    const { titulo } = req.body;

    try {
        // Verificar si el libro ya existe
        const libroExistente = await Libro.findOne({ titulo });

        if (libroExistente) {
            return res.status(400).json({
                success: false,
                msg: "El libro ya existe en el inventario"
            });
        }

        // Crear nuevo libro
        const nuevoLibro = new Libro(req.body);

        await nuevoLibro.save();

        res.status(201).json({
            success: true,
            msg: "Libro creado exitosamente",
            libro: nuevoLibro
        });

    } catch (error) {
        console.error("Error al crear libro:", error);
        return res.status(500).json({
            success: false,
            msg: "Error al crear libro"
        });
    }
};

module.exports = {
    crearLibro
};
