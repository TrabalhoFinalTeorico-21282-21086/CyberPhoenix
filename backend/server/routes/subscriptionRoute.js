const router = require("express").Router();
const controller = require("../controllers/subscriptionController");
const authorize = require("../configs/authorization");
const roles = require("../helpers/rolls");


router.get("/", authorize(roles.gestor, roles.funcionario), controller.mostrarSubscricoes);
router.post("/add", authorize(roles.gestor, roles.funcionario, roles.anonimo), controller.inserirSubscricao);
router.post("/delete", authorize(roles.gestor, roles.funcionario, roles.anonimo), controller.apagarSubscricao);
router.post("/subPart/", authorize(roles.gestor, roles.funcionario, roles.anonimo), controller.existeSubscricao);
router.post("/mostrarQuemSubscreveu/", authorize(roles.gestor, roles.funcionario, roles.anonimo), controller.mostrarQuemSubscreveu);
router.post("/mostrarQuemFoiSubscrito/", authorize(roles.gestor, roles.funcionario, roles.anonimo), controller.mostrarQuemFoiSubscrito);
router.delete("/", authorize(roles.gestor), controller.apagarTodas);

module.exports = router;