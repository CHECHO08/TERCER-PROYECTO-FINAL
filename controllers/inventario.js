const { response } = require("express");
const Libro = require("../model/libro");

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
        return res.status(500).json({
            success: false,
            msg: "Error al obtener libros"
        });
    }
};

const getLibroDetalle = async (req, res = response) => { 
    const { id } = req.params;

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
        return res.status(500).json({
            success: false,
            msg: "Error al obtener el detalle del libro"
        });
    }
};

const actualizarLibro = async (req, res = response) => {   
    const { id } = req.params;

    try {
        const libro = await Libro.findById(id);

        if (!libro) {
            return res.status(404).json({
                success: false,
                msg: "No existe un libro con ese id"
            });
        }

        const { titulo } = req.body;

        // Validar si el título ya existe
        if (titulo && titulo !== libro.titulo) {
            const libroExistente = await Libro.findOne({ titulo });

            if (libroExistente) {
                return res.status(400).json({
                    success: false,
                    msg: `El título "${titulo}" ya existe en el inventario`
                });
            }
        }

        const libroActualizado = await Libro.findByIdAndUpdate(id, req.body, { new: true });

        res.status(200).json({
            success: true,
            msg: "Libro actualizado exitosamente",
            libro: libroActualizado
        });

    } catch (error) {
        console.error("Error al actualizar el libro:", error);
        return res.status(500).json({
            success: false,
            msg: "Error al actualizar el libro"
        });
    }
}


const eliminarLibro = async (req, res = response) => {   
    const { id } = req.params;

    try {
        const libro = await Libro.findById(id);

        if (!libro) {
            return res.status(404).json({
                success: false,
                msg: "No existe un libro con ese id"
            });
        }

        const libroEliminado = await Libro.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            msg: "Libro eliminado exitosamente",
            libro: libroEliminado
        });

    } catch (error) {
        console.error("Error al eliminar libro:", error);
        return res.status(500).json({
            success: false,
            msg: "Error al eliminar el libro"
        });
    }
};

module.exports = {
    crearLibro,
    getLibro,
    getLibroDetalle,
    actualizarLibro,
    eliminarLibro
};

