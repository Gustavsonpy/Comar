import express from 'express';
import mysql from 'mysql2';
import path from 'path';

const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Configuração do banco de dados
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'instituto_comar'
});

// Conexão com o banco de dados
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados MySQL');
});

// app.post('/cadastro', (req, res) => {
//   const { email, user, password } = req.body;

//   if (req.body.password !== req.body.confirmationPassword) {
//     return res.redirect('/cadastro');
//   }else{
//     // Inserir os dados no banco de dados
//     const queryString = 'INSERT INTO usuario (email, nome_user, senha) VALUES (?, ?, ?)';
//     connection.query(queryString, [email, user, password], (err, results, fields) => {
//       if (err) {
//         console.error('Erro ao cadastrar usuário:', err);
//         return res.status(500).send('Erro ao cadastrar usuário');
//       }
//       console.log('Usuário cadastrado com sucesso');
//       res.sendFile('index.html', { root: 'public/html'}); 
//     });
//   }
// });


app.post('/cadastro', (req, res) => {
  const { email, user, password } = req.body;
  let logar = false;
  
  const queryString = 'SELECT * FROM usuario';
  connection.query(queryString, (err, results, fields) => {
    if (err) {
      console.error('Erro ao buscar dados:', err);
      return res.status(500).send('Erro ao buscar dados');
    }
    for(let i=0; i<results.length-1; i++){
      if(results[i].nome_user === email) {
        console.log("EXISTE CADASTRADO");
        logar = true;
      }else{
        console.log("VAI TER QUE CADASTRAR")
      }
    }
  });
  
  // if (req.body.password !== req.body.confirmationPassword) {
  if(logar === false){
    // Inserir os dados no banco de dados
    const queryString = 'INSERT INTO usuario (email, nome_user, senha) VALUES (?, ?, ?)';
    connection.query(queryString, [email, user, password], (err, results, fields) => {
      if (err) {
        console.error('Erro ao cadastrar usuário:', err);
        return res.status(500).send('Erro ao cadastrar usuário');
      }
      console.log('Usuário cadastrado com sucesso');
      res.sendFile('index.html', { root: 'public/html'}); 
    });
  }
});


app.get('/', (req, res) => {
    res.sendFile('index.html', { root: 'public/html'});
  });

app.get('/cadastro', (req, res) => {
  res.sendFile('login.html', { root: 'public/html'});
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});