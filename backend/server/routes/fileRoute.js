const router = require("express").Router();
const controller = require("./../controllers/fileController");
const authorize = require("./../configs/authorization");
const roles = require("../helpers/rolls");


router.get("/", controller.mostrarFicheiros);
router.post("/", controller.mostrarFicheirosCategorizados);
router.get("/:id", authorize(roles.anonimo, roles.funcionario, roles.gestor), controller.mostrarFicheiro);
router.delete("/", authorize(roles.gestor), controller.apagarFicheiros)

module.exports = router;