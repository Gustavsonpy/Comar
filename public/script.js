//1- SCRIP.JS - LINKADO AO HTML
import { printData } from "../JS/print.js";
import { saveData, getData } from "../JS/localStorage.js";
import { novoProjeto, saveUser } from "../JS/crud.js";
import { connection } from "../JS/db.js";

document.getElementById('register').addEventListener('submit', function(event) {
  event.preventDefault();

  const nome = document.getElementById('user').value;
  const email = document.getElementById('emailRegister').value;
  const senha = document.getElementById('password').value;

  fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nome, email, senha })
  })
  .then(response => response.text())
  .then(data => {
      alert(data);
  })
  .catch(error => {
      console.error('Erro:', error);
  });
});

// connection.connect((err) =>{
//   if (err){
//       console.log("Erro ao se conectar com o servidor")
//       return;
//     }
//   console.log("Servidor conectado!")
// });

// document.addEventListener('DOMContentLoaded', () => {

//   let btn_cadastro = document.getElementById('btn-register')

//   btn_cadastro.addEventListener('click', () => {
//     const emailUsuario = document.getElementById('emailRegister').value;
//     const usuario = document.getElementById('user').value;
//     const senhaUsuario = document.getElementById('password').value;
//     const confirmacaoSenhaUsuario = document.getElementById('confirmationPassword').value;

//     if (senhaUsuario !== confirmacaoSenhaUsuario) {
//       console.error('Error: Passwords do not match');
//       return;
//     }

//     saveUser(emailUsuario, usuario, senhaUsuario)
//       .then(results => {
//         console.log('User saved:', results);
//       })
//       .catch(error => {
//         console.error('Error saving user:', error);
//       });
//   })
// });

// saveData(data)
//puxa os dados do armazenamento
///let data = getData();
//senao tiver dados, os arrays são definidos como vazios
///if (data == null || data == 0 || data == undefined) {
  ///data = [
    ///{
      ///usuarios: [],
      ///projetos: [],
    ///},
  ///];
///}

//função para imprimir dados na página
///printData(data);

//!-!-!-!-!-!-!-!
//MODELO DE DADOS
// let data = [
//   {
//     usuarios: [
//       {
//         id: 1,
//         email: "lucas.klemke@outlook.com.br",
//         usuario: "luke",
//         senha: "123456",
//       },
//       {
//         id:2,
//         email: "teste@gmail.com",
//         usuario: "userteste",
//         senha: "teste123",
//       },
//     ],
//     projetos: [
//       {
//         id: 1,
//         titulo: "projeto Teste",
//         entrada: 0,
//         saida: 0,
//         saldo: 0,
//         lancamentos: [
//           {
//             dataLancamento: "11/05/2024",
//             dataMovimento: "11/05/2024",
//             historico: "CRED TED",
//             documento: "1000",
//             valor: 0,
//             saldo: 0,
//             fornecedor: "PayPal",
//             notaFiscal: "00.00000",
//             entrada: true,
//           },
//           {
//             dataLancamento: "10/05/2024",
//             dataMovimento: "10/05/2024",
//             historico: "DOAÇÃO",
//             documento: "2340",
//             valor: 0,
//             saldo: 0,
//             fornecedor: "Anonimo",
//             notaFiscal: "11.1111",
//             entrada: false,
//           },
//         ],
//       },
//       {
//         id: 2,
//         titulo: "projeto2",
//         entrada: 500.00,
//         saida: 60.00,
//         saldo: 440.00,
//         lancamentos: [
//           {
//             dataLancamento: "11/05/2024",
//             dataMovimento: "11/05/2024",
//             historico: "CRED TED",
//             documento: "1000",
//             valor: 500,
//             saldo: 0,
//             fornecedor: "PayPal",
//             notaFiscal: "00.00000",
//             entrada: true,
//           },
//           {
//             dataLancamento: "10/05/2024",
//             dataMovimento: "10/05/2024",
//             historico: "DOAÇÃO",
//             documento: "2340",
//             valor: 60.00,
//             saldo: 500,
//             fornecedor: "Anonimo",
//             notaFiscal: "11.1111",
//             entrada: false,
//           }
//         ],
//       },
//     ],
//   },
// ];
