const { Router } = require("express");
const router = Router();

const { check } = require("express-validator");    
const { crearLibro, getLibro, getLibroDetalle } = require("../controllers/inventario");
const { validarCampos } = require("../middlewares/validaciones");

// Rutas inventario

router.get ("/lists", getLibro);

router.post("/lists", [
    check("titulo", "El titulo es obligatorio").not().isEmpty(),
    check("autor", "El autor es obligatorio").not().isEmpty(),

    validarCampos
], crearLibro);

router.get ("/lists/:id", getLibroDetalle);

router.put("/lists/:id", (req, res) => {
    res.json({
        success: true,
        msg: `Actualizar inventario ${req.params.id}`
    });
});

module.exports = router;
 
