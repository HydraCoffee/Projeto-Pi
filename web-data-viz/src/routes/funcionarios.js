var express = require("express");
var router = express.Router();

var funcionarioController = require("../controllers/funcionarioController");

router.post("/cadastrar", function (req, res) {
    funcionarioController.cadastrar(req, res);
});

router.post("/autenticar", function (req, res) {
    funcionarioController.autenticar(req, res);
});

module.exports = router;