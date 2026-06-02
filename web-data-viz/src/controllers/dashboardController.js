var dashboardModel = require("../models/dashboardModel");

function buscarDadosGerais (req, res) {
    var idEmpresa = req.params.idEmpresa;

    if (idEmpresa == undefined) {
        res.status(400).send("O idEmpresa está undefined!");
    } else {
        dashboardModel.buscarDadosGerais(idEmpresa)
            .then(function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum dado encontrado para essa empresa.");
                }
            })
            .catch(function (erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function buscarDadosHectare (req, res) {
    var idSetor = req.params.idSetor;

    if (idSetor == undefined) {
        res.status(400).send("O idSetor está undefined!");
    } else {
        dashboardModel.buscarDadosHectare(idSetor)
            .then(function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum dado encontrado para este hectare.");
                }
            })
            .catch(function (erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

module.exports = {
    buscarDadosGerais,
    buscarDadosHectare
};