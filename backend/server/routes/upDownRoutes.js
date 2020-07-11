const router = require("express").Router();
const controller = require("../controllers/upDownControler");
const authorize = require("../configs/authorization");
const roles = require("../helpers/rolls");

router.get("/download/:id", controller.downloadFicheiro);
router.post("/upload/:id", authorize(roles.gestor, roles.funcionario, roles.anonimo), controller.inserirFicheiro);
router.post("/update", authorize(roles.gestor, roles.funcionario, roles.anonimo), controller.modificarFicheiro);
router.post("/delete", authorize(roles.gestor, roles.funcionario, roles.anonimo), controller.apagarFicheiro);

module.exports = router;
