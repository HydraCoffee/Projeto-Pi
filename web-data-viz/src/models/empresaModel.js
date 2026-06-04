var database = require("../database/config");

function buscarPorId(id) {
  var instrucaoSql = `SELECT * FROM empresa WHERE idEmpresa = ${id};`;
  return database.executar(instrucaoSql);
}

function listar() {
  var instrucaoSql = `SELECT idEmpresa, razaoSocial, cnpj, codigo FROM empresa;`;
  return database.executar(instrucaoSql);
}

function buscarPorCnpj(cnpj) {
  var instrucaoSql = `SELECT * FROM empresa WHERE cnpj = '${cnpj}';`;
  return database.executar(instrucaoSql);
}

function cadastrar(razaoSocial, cnpj, nomeFantasia, codigo) {
  var instrucaoSql = `INSERT INTO empresa (razaoSocial, cnpj, nomeFantasia, codigo) 
                      VALUES ('${razaoSocial}', '${cnpj}', '${nomeFantasia}', '${codigo}');`;
  return database.executar(instrucaoSql);
}

module.exports = { buscarPorCnpj, buscarPorId, cadastrar, listar };