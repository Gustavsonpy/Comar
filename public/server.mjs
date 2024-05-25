import express from 'express';
import mysql from 'mysql2';

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Configuração do banco de dados
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'comar'
});

// Conexão com o banco de dados
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados MySQL');
});

app.post('/cadastro', (req, res) => {
  const { email, user, password } = req.body;

  // Inserir os dados no banco de dados
  const queryString = 'INSERT INTO users (email, username, senhaUsuario) VALUES (?, ?, ?)';
  connection.query(queryString, [email, user, password], (err, results, fields) => {
    if (err) {
      console.error('Erro ao cadastrar usuário:', err);
      return res.status(500).send('Erro ao cadastrar usuário');
    }
    console.log('Usuário cadastrado com sucesso');
    res.send('Usuário cadastrado com sucesso');
  });
});

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: './'});
  });

  app.get('/cadastro', (req, res) => {
    res.sendFile('login.html', { root: 'html'});
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
