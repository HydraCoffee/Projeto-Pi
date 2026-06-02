const { buscarDadosHectare } = require("../controllers/dashboardController");
var database = require("../database/config");

function buscarDadosGerais(idEmpresa) {
    var instrucaoSql = `
    SELECT
        m.umidade,
        m.dtHrMedicao,
        DATE_FORMAT(m.dtHrMedicao, '%H:%i') AS momento_grafico,
        s.talhao
    FROM  medicao m
    JOIN sensor s ON m.fkSensor = s.idsensor 
    JOIN setor st ON s.fkSetor = st.idSetor 
    WHERE st.fkEmpresa = ${idEmpresa}
    ORDER BY m.idMedicao DESC 
    LIMIT 7;
    `;

    console.log("Executando SQL Geral: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarDadosHectare(idSetor) {
    var instrucaoSql = `
    SELECT
        m.umidade,
        m.dtHrMedicao,
        DATE_FORMAT(m.dtHrMedicao, '%H:%i') AS momento_grafico,
        s.talhao
    FROM  medicao m
    JOIN sensor s ON m.fkSensor = s.idsensor 
    WHERE s.fkSetor = ${idSetor}
    ORDER BY m.idMedicao DESC 
    LIMIT 7;
    `;

    console.log("Executando SQL Hectare: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarDadosGerais,
    buscarDadosHectare
};