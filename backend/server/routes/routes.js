const router = require("express").Router();
const controller = require("./../controllers/controllers");


router.get("/", controller.teste);
router.post("/add", controller.insNewUser);
router.get("/all", controller.mostrarUsers);
router.delete("/all", controller.apagarTudo);

module.exports = router;
