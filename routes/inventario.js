const { Router } = require("express");
const router = Router();
const  { crearLibro } = require ("../controllers/inventario")

// Rutas inventario

router.get("/lists", (req, res) => {
    res.json({
        success: true,
        msg: "Lista de inventario"
    });
});

router.post("/lists", crearLibro );

router.put("/lists/:id", (req, res) => {
    res.json({
        success: true,
        msg: `Actualizar inventario ${req.params.id}`
    });
});

router.delete("/lists/:id", (req, res) => {
    res.json({
        success: true,
        msg: `Eliminar inventario ${req.params.id}`
    });
});

// Exportar router
module.exports = router;
