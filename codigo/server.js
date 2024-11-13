const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const port = 3000;

// rota principal
app.get('/', (req, res) => {
    res.send('acesse: <br> <strong>/novarota</strong> ou <strong>/consulta-cep</strong>')
});

// exemplo que adiciona a nova rota
app.get('/novarota', (req, res) => {
    res.send('Nova rota criada.')
});

// envia os arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, 'public')));

// rota que conecta a página de consulta de CEP
app.get('/consulta-cep', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// rota para consultar o CEP
app.get('/consulta-cep/:cep', async (req, res) => {
    const cep = req.params.cep;

    try {
        const response = await axios.get(`http://viacep.com.br/ws/${cep}/json/`);
        res.json(response.data);
    } catch (error) {
        console.error('Erro ao fazer requisição:', error);
        res.status(500).send('Erro ao consultar o CEP.');
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});