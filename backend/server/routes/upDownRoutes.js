const router = require("express").Router();
const controller = require("../controllers/upDownControler");
const authorize = require("../configs/authorization");
const roles = require("../helpers/rolls");

router.get("/teste", controller.teste);
router.get("/download/:id", /*authorize(roles.gestor, roles.funcionario, roles.anonimo),*/ controller.downloadFicheiro);
router.post("/upload/:id", authorize(roles.gestor, roles.funcionario, roles.anonimo), controller.inserirFicheiro);

module.exports = router;
