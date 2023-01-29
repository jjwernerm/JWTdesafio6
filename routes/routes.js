const { Router } = require("express");
const router = Router();

const { obtener_usuarios, registrar_usuario, autenticar_usuario, modificar_usuario, eliminar_usuario } = require("../controllers/controllers");

router.get("/usuarios", obtener_usuarios);
router.post("/login", registrar_usuario);
router.post("/autenticar", autenticar_usuario);
router.put("/modificar/:id", modificar_usuario);
router.delete("/eliminar/:id", eliminar_usuario);

module.exports = router;