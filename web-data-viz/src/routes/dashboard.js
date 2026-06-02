var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.get("/geral/:idEmpresa", function (req, res) {
  dashboardController.buscarDadosGerais(req, res);
});

router.get("/hectare/:idSetor", function (req, res) {
  dashboardController.buscarDadosHectare(req, res);
});

module.exports = router;