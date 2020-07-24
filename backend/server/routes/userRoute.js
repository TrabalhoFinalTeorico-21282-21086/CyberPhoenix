const router = require("express").Router();
const controller = require("../controllers/userControler");
const authorize = require("../configs/authorization");
const roles = require("../helpers/rolls");


router.post("/registar", controller.registar);
router.post("/alterar", authorize(roles.gestor, roles.funcionario, roles.anonimo), controller.modificar);
router.post("/autenticar", controller.autenticar);
router.get("/", authorize(roles.gestor, roles.funcionario, roles.anonimo), controller.mostrarUsers);
router.get("/:id", authorize(roles.gestor, roles.funcionario, roles.anonimo), controller.mostrarUserUnico);
router.delete("/", authorize(roles.gestor), controller.apagarTudo);
router.delete("/:id", authorize(roles.gestor, roles.funcionario, roles.anonimo), controller.apagarEspecifico);

module.exports = router;
