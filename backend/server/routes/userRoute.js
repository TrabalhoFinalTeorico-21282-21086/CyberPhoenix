const router = require("express").Router();
const controller = require("./../controllers/userControler");


router.post("/registar", controller.registar);
router.post("/autenticar", controller.autenticar);
router.get("/all", controller.mostrarUsers);
router.delete("/all", controller.apagarTudo);


module.exports = router;
