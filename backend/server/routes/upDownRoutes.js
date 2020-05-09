const router = require("express").Router();
const controller = require("../controllers/upDownControler");
const authorize = require("../configs/authorization");
const roles = require("../helpers/rolls");

router.get("/teste", controller.teste);
router.get("/", authorize(roles.gestor, roles.funcionario, roles.anonimo), controller.mostrarFicheiros);
router.post("/", authorize(roles.gestor, roles.funcionario, roles.anonimo), controller.inserirFicheiroImaginario);
router.post("/:id", authorize(roles.gestor, roles.funcionario, roles.anonimo), controller.inserirFicheiro);

module.exports = router;
