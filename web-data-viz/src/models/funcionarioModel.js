var database = require("../database/config");

function autenticar(email, senha) {
    console.log("ACESSEI O FUNCIONARIO MODEL \n function entrar(): ", email, senha);
    
    var instrucaoSql = `
        SELECT idFuncionario, nome, email, fkEmpresa FROM funcionario 
        WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrar(nome, email, senha, fkEmpresa) {
    console.log("ACESSEI O FUNCIONARIO MODEL \n function cadastrar():", nome, email, senha, fkEmpresa);
    
    var instrucaoSql = `
        INSERT INTO funcionario (nome, email, senha, fkEmpresa) 
        VALUES ('${nome}', '${email}', '${senha}', '${fkEmpresa}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar
};