CREATE DATABASE hydraCoffee;
USE hydraCoffee;

CREATE TABLE empresa (
    idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
    razaoSocial VARCHAR(45) NOT NULL,
    cnpj CHAR(14) NOT NULL,
    nomeFantasia VARCHAR(45) NOT NULL,
    codigo VARCHAR(7) UNIQUE NOT NULL
);

CREATE TABLE funcionario (
    idFuncionario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    email VARCHAR(60) NOT NULL,
    senha VARCHAR(45) NOT NULL,
    fkEmpresa INT NOT NULL,
    CONSTRAINT fkFunEmpresa FOREIGN KEY (fkEmpresa) 
    REFERENCES empresa(idEmpresa)
);

ALTER TABLE funcionario ADD COLUMN tipo VARCHAR(20) DEFAULT 'funcionario';
-- pega o email do admin cadastrado e seleciona o tipo dele para admin e nao funcionario.
UPDATE funcionario SET tipo = 'admin' WHERE email = 'admin@gmail.com';


CREATE TABLE endereco (
    idEndereco INT PRIMARY KEY AUTO_INCREMENT,
    descricao VARCHAR(200),
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    fkEmpresa INT NOT NULL,
    CONSTRAINT fkEndEmpresa FOREIGN KEY (fkEmpresa) 
    REFERENCES empresa(idEmpresa)
);

CREATE TABLE setor (
    idSetor INT PRIMARY KEY AUTO_INCREMENT,
    regiao VARCHAR(15),
    CONSTRAINT chkRegiao CHECK (regiao IN ('Norte', 'Sul', 'Leste', 'Oeste')),
    fkEmpresa INT NOT NULL,
    CONSTRAINT fkSetEmpresa FOREIGN KEY (fkEmpresa) 
    REFERENCES empresa(idEmpresa)
);

CREATE TABLE sensor (
    idsensor INT PRIMARY KEY AUTO_INCREMENT,
    statusSensor VARCHAR(45),
    CONSTRAINT chkStatusSensor CHECK (statusSensor IN ('Danificado', 'Em manutenção', 'Funcionando')),
    talhao VARCHAR(45),
    fila INT,
    planta INT,
    fkSetor INT NOT NULL,
    CONSTRAINT fkSenSetor FOREIGN KEY (fkSetor)
    REFERENCES setor(idSetor)
);

CREATE TABLE medicao (
    idMedicao INT PRIMARY KEY AUTO_INCREMENT,
    umidade INT NOT NULL,
    dtHrMedicao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fkSensor INT NOT NULL,
    CONSTRAINT fkMedSensor FOREIGN KEY (fkSensor) 
    REFERENCES sensor(idsensor)
);

CREATE TABLE alerta (
    idAlerta INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45),
    dtHrAlerta TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    statusAlerta VARCHAR(45),
    CONSTRAINT chkStatusAlerta CHECK (statusAlerta IN ('Normal', 'Alerta')),
    fkMedicao INT NOT NULL,
    CONSTRAINT fkAleMedicao FOREIGN KEY (fkMedicao) 
    REFERENCES medicao(idMedicao)
); 

INSERT INTO empresa (razaoSocial, cnpj, nomeFantasia, codigo)
VALUES
('Cafezin da Serra Comercio de Cafe LTDA', '12345678000199', 'Cafezin da serra', 'CAF0001'),
('Grãos de Ouro Agronegocios S.A.', '98765432000188', 'Grãos de Ouro', 'GRA0002'),
('Brasil Café LTDA', '45612378000122', 'Brasil Café', 'BRA0003');

SELECT * FROM empresa;

INSERT INTO setor (regiao, fkEmpresa)
VALUES
('Norte', 1),
('Sul', 1),
('Norte', 2),
('Sul', 2),
('Norte', 3),
('Sul', 3);

INSERT INTO sensor (statusSensor, talhao, fila, planta, fkSetor)
VALUES
('Funcionando', 'Talhão A', 1, 1, 1);


SELECT f.*, e.codigo FROM funcionario f
JOIN empresa e ON f.fkEmpresa = e.idEmpresa
;
-- Essa view reúne as medições dos sensores
-- vinculados aos setores de uma empresa.
-- Pra dashboard.


CREATE VIEW vw_dados_gerais_empresa AS
SELECT
    m.idMedicao,
    m.umidade,
    m.dtHrMedicao,
    DATE_FORMAT(m.dtHrMedicao, '%H:%i') AS momento_grafico,
    s.talhao,
    st.idSetor,
    st.fkEmpresa AS idEmpresa
FROM medicao AS m
INNER JOIN sensor AS s
    ON m.fkSensor = s.idsensor
INNER JOIN setor AS st
    ON s.fkSetor = st.idSetor;

-- Essa view reúne as medições dos sensores
-- de cada setor ou hectare.
-- Ela serve para exibir os dados específicos de um setor na dashboard.

CREATE VIEW vw_dados_hectare AS
SELECT
    m.idMedicao,
    m.umidade,
    m.dtHrMedicao,
    DATE_FORMAT(m.dtHrMedicao, '%H:%i') AS momento_grafico,
    s.talhao,
    s.fkSetor AS idSetor
FROM medicao AS m
INNER JOIN sensor AS s
    ON m.fkSensor = s.idsensor;
