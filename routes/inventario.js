const { Router } = require("express");
const router = Router();

// Rutas inventario

router.get("/lists", (req, res) => {
    res.json({
        success: true,
        msg: "Lista de inventario"
    });
});

router.post("/lists", (req, res) => {
    res.json({
        success: true,
        msg: "Agregar inventario"
    });
});

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
