var empresaModel = require("../models/empresaModel");

function buscarPorCnpj(req, res) {
  var cnpj = req.query.cnpj;

  empresaModel.buscarPorCnpj(cnpj).then((resultado) => {
    res.status(200).json(resultado);
  }).catch((erro) => {
    res.status(500).json(erro.sqlMessage);
  });
}

function listar(req, res) {
  empresaModel.listar().then((resultado) => {
    res.status(200).json(resultado);
  }).catch((erro) => {
    res.status(500).json(erro.sqlMessage);
  });
}

function buscarPorId(req, res) {
  var id = req.params.id;

  empresaModel.buscarPorId(id).then((resultado) => {
    res.status(200).json(resultado);
  }).catch((erro) => {
    res.status(500).json(erro.sqlMessage);
  });
}

function cadastrar(req, res) {
  var cnpj = req.body.cnpj;
  var razaoSocial = req.body.razaoSocial;
  var nomeFantasia = req.body.nomeFantasia;
  var codigo = req.body.codigo;

  empresaModel.buscarPorCnpj(cnpj).then((resultado) => {
    if (resultado.length > 0) {
      res.status(401).json({ mensagem: `A empresa com o cnpj ${cnpj} já existe` });
    } else {
      empresaModel.cadastrar(razaoSocial, cnpj, nomeFantasia, codigo).then((resultado) => {
        res.status(201).json(resultado);
      });
    }
  }).catch((erro) => {
    res.status(500).json(erro.sqlMessage);
  });
}

module.exports = {
  buscarPorCnpj,
  buscarPorId,
  cadastrar,
  listar,
};