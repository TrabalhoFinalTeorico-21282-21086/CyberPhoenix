const router = require("express").Router();
const controller = require("./../controllers/controllers");
const authorize = require("./../configs/authorization");
const roles = require("../helpers/rolls");


router.get("/", authorize(roles.gestor, roles.funcionario, roles.anonimo), controller.teste);
router.post("/add", authorize(roles.gestor, roles.funcionario, roles.anonimo), controller.insNewUser);
router.get("/all", authorize(roles.gestor, roles.funcionario), controller.mostrarUsers);
router.delete("/all", authorize(roles.gestor), controller.apagarTudo);

module.exports = router;

