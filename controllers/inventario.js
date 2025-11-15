const { response } = require("express");
const Libro = require("../model/libro"); // << CORREGIDO

const crearLibro = async (req, res = response) => {
    const { titulo } = req.body;

    try {
        const libroExistente = await Libro.findOne({ titulo });

        if (libroExistente) {
            return res.status(400).json({
                success: false,
                msg: "El libro ya existe en el inventario"
            });
        }

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

const getLibro = async (req, res = response) => {
    try {
        const libros = await Libro.find();

        res.status(200).json({
            success: true,
            msg: "Lista de libros",
            libros
        });

    } catch (error) {
        console.error("Error al obtener libros:", error);
        return res.status(500).json({
            success: false,
            msg: "Error al obtener libros"
        });
    }
};

const getLibroDetalle = async (req, res = response) => { 
    const { id } = req.params; // << CORREGIDO

    try {
        const libro = await Libro.findById(id);

        if (!libro) {
            return res.status(404).json({
                success: false,
                msg: "Libro no encontrado"
            });
        }

        res.status(200).json({
            success: true,
            msg: "Detalle del libro",
            libro
        });

    } catch (error) {
        console.error("Error al obtener el detalle del libro", error);
        return res.status(500).json({
            success: false,
            msg: "Error al obtener el detalle del libro"
        });
    }
};

module.exports = {
    crearLibro,
    getLibro,
    getLibroDetalle
};
