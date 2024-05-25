//1- SCRIP.JS - LINKADO AO HTML
import { printData } from "../JS/print.js";
import { saveData, getData } from "../JS/localStorage.js";
import { novoProjeto } from "../JS/crud.js";

//saveData(data)
//puxa os dados do armazenamento
let data = getData();
//senao tiver dados, os arrays são definidos como vazios
if (data == null || data == 0 || data == undefined) {
  data = [
    {
      usuarios: [],
      projetos: [],
    },
  ];
}

//função para imprimir dados na página
printData(data);

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
