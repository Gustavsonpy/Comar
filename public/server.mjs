import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql2';

const app = express();
const port = 3000;

app.use('/JS', express.static('public', { 'extensions': ['js'], 'setHeaders': (res, path, stat) => { res.set('Content-Type', 'text/javascript'); } }));
app.use(express.static('public'));
app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "comar"
})

connection.connect(err => {
    if(err){console.log("Erro ao se conectar com o banco")}
    else{console.log("Sucesso ao se conectar com o banco!")}
});

app.get('/', (req, res) => {
    res.sendFile('login.html', { root: 'public' });
});

app.post('/register', (req, res) => {
    const { nome, email, senha } = req.body;
    const query = 'INSERT INTO users (username, email, senhaUsuario) VALUES (?, ?, ?)';

    connection.query(query, [nome, email, senha], (err, results) => {
        if (err) {
            console.error('Erro ao inserir dados:', err);
            res.status(500).send('Erro ao cadastrar usuário');
        } else {
            res.status(200).send('Usuário cadastrado com sucesso');
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
})
