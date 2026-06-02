const serialport = require('serialport');
const express = require('express');
const mysql = require('mysql2');

const SERIAL_BAUD_RATE = 9600;
const SERVIDOR_PORTA = 3300;
const HABILITAR_OPERACAO_INSERIR = true;
const FK_SENSOR_ID = 1;

const serial = async (valoresporcentagem) => {

    let poolBancoDados = mysql.createPool({
        host: '127.0.0.1',
        user: 'API-Arduino',
        password: 'Arduino1234',
        database: 'hydraCoffee',
        port: 3306
    }).promise();

    const portas = await serialport.SerialPort.list();
    const portaArduino = portas.find((porta) => porta.vendorId == 2341 && porta.productId == 43);
    if (!portaArduino) {
        throw new Error('O arduino não foi encontrado em nenhuma porta serial');
    }

    const arduino = new serialport.SerialPort({
        path: portaArduino.path,
        baudRate: SERIAL_BAUD_RATE
    });

    arduino.on('open', () => {
        console.log(`Leitura iniciada na porta ${portaArduino.path} | Baud Rate: ${SERIAL_BAUD_RATE}`);
    });

    arduino.pipe(new serialport.ReadlineParser({ delimiter: '\r\n' })).on('data', async (data) => {
        console.log(data);
        const valores = data.split(';');
        const umidade = parseInt(valores[0]);
        valoresporcentagem.push(umidade);

        if (HABILITAR_OPERACAO_INSERIR) {
            await poolBancoDados.execute(
                'INSERT INTO medicao (umidade, fkSensor) VALUES (?, ?)',
                [umidade, FK_SENSOR_ID]
            );
            console.log("Valores inseridos no banco:", umidade);
        }
    });

    arduino.on('error', (mensagem) => {
        console.error(`Erro no arduino: ${mensagem}`);
    });
};

const servidor = (valoresporcentagem) => {
    const app = express();

    app.use((request, response, next) => {
        response.header('Access-Control-Allow-Origin', '*');
        response.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
        next();
    });

    app.listen(SERVIDOR_PORTA, () => {
        console.log(`API executada com sucesso na porta ${SERVIDOR_PORTA}`);
    });

    app.get('/sensores/analogico', (_, response) => {
        return response.json(valoresporcentagem);
    });

    app.get('/sensores/digital', (_, response) => {
        return response.json(valoresporcentagem);
    });
};

(async () => {
    const valoresporcentagem = [];
    await serial(valoresporcentagem);
    servidor(valoresporcentagem);
})();