var database = require("../database/config");

function autenticar(email, senha, codigo) {
    console.log("ACESSEI O FUNCIONARIO MODEL \n function entrar(): ", email, senha);
    
    var instrucaoSql = `
        SELECT idFuncionario, nome, funcionario.email, fkEmpresa, tipo FROM funcionario 
        JOIN empresa ON funcionario.fkEmpresa = empresa.idEmpresa
        WHERE funcionario.email = '${email}' AND funcionario.senha = '${senha}'
        AND empresa.codigo = '${codigo}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function autenticarSemCodigo(email, senha) {
    var instrucaoSql = `
        SELECT idFuncionario FROM funcionario 
        WHERE email = '${email}' AND senha = '${senha}';
    `;
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
    cadastrar,
    autenticarSemCodigo
};