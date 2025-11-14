const { Router } = require("express");
const router = Router();

const { check } = require("express-validator");    
const { crearLibro } = require("../controllers/inventario");
const { validarCampos } = require("../middlewares/validaciones");

// Rutas inventario

router.get("/lists", (req, res) => {
    res.json({
        success: true,
        msg: "Lista de inventario"
    });
});

router.post("/lists", [
    check("titulo", "El titulo es obligatorio").not().isEmpty(),
    check("autor", "El autor es obligatorio").not().isEmpty(),
    check("apublicacion", "El año de publicacion es obligatorio").not().isEmpty(),
    check("editorial", "La editorial es obligatoria").not().isEmpty(),
    check("categoria", "La categoria es obligatoria").not().isEmpty(),
    check("sede", "la sede es obligatoria").not().isEmpty(),
    validarCampos
], crearLibro);

router.put("/lists/:id", (req, res) => {
    res.json({
        success: true,
        msg: `Actualizar inventario ${req.params.id}`
    });
});

module.exports = router;
 
