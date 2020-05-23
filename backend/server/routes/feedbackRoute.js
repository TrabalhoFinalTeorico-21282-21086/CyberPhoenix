const router = require("express").Router();
const controller = require("../controllers/feedbackController");
const authorize = require("../configs/authorization");
const roles = require("../helpers/rolls");

router.get("/", authorize(roles.gestor, roles.funcionario, roles.anonimo), controller.mostrarFeedBack);
router.get("/:id", authorize(roles.gestor, roles.funcionario, roles.anonimo), controller.mostrarFeedBackFicheiro);
router.post("/", authorize(roles.gestor, roles.funcionario, roles.anonimo), controller.inserirFeedBack);
router.delete("/", authorize(roles.gestor, roles.funcionario, roles.anonimo), controller.apagarFeedBack);

module.exports = router;