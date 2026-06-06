var funcionarioModel = require("../models/funcionarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var codigo = req.body.codigoServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else if (codigo == undefined || codigo == "") {
        res.status(400).send("O código da empresa é obrigatório!");
    } else {
        funcionarioModel.autenticar(email, senha, codigo)
            .then(function (resultadoAutenticar) {
                if (resultadoAutenticar.length == 1) {
                    res.json({
                        id: resultadoAutenticar[0].idFuncionario,
                        nome: resultadoAutenticar[0].nome,
                        email: resultadoAutenticar[0].email,
                        fkEmpresa: resultadoAutenticar[0].fkEmpresa,
                        tipo: resultadoAutenticar[0].tipo
                    });
                } else if (resultadoAutenticar.length == 0) {
                    // Verifica se email/senha existem sem o código
                    funcionarioModel.autenticarSemCodigo(email, senha)
                        .then(function (resultadoSemCodigo) {
                            if (resultadoSemCodigo.length == 1) {
                                // Email e senha corretos mas código errado
                                res.status(403).send("Código da empresa inválido!");
                            } else {
                                res.status(403).send("Email e/ou senha inválido(s)!");
                            }
                        });
                } else {
                    res.status(403).send("Mais de um funcionário com o mesmo login e senha!");
                }
            }).catch(function (erro) {
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function cadastrar(req, res) {
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var fkEmpresa = req.body.idEmpresaVincularServer;

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (fkEmpresa == undefined) {
        res.status(400).send("Sua empresa a vincular está undefined!");
    } else {
        funcionarioModel.cadastrar(nome, email, senha, fkEmpresa)
            .then(function (resultado) {
                res.json(resultado);
            }).catch(function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao realizar o cadastro! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

module.exports = {
    autenticar,
    cadastrar
}