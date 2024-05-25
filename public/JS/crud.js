//3- CRUD.JS - CRUD DO PROGRAMA
//C - Create
//R - Read
//U - Update
//D - Delete

import { saveData } from "./localStorage.js";
import { saveSelect, getSelect } from "./localStorage.js";

//criarNovoProjeto
export function novoProjeto(data) {
  //MOSTRAR
  //deixar pop-up visivel
  const popUp = document.getElementById("popUpProjeto");
  popUp.classList.remove("invisible");
  //Overlay que vai ser atribuido a classe do blur
  const overlay = document.getElementById("overlayDiv");
  overlay.classList.add("background-overlay");

  //ENVIAR
  //formulario do popUp novo projeto
  const form = document.getElementById("projectForm");
  //ao enviar o formulario...
  form.addEventListener("submit", (ev) => {
    const tituloInput = document.getElementById("projectTitle").value;
    //cria novo objeto projeto
    let novoProjeto = {
      id: data[0].projetos.length + 1,
      titulo: tituloInput,
      entrada: 0,
      saida: 0,
      saldo: 0,
      lancamentos: [],
    };

    console.log(`select : ` + novoProjeto.id);

    //array de dados adiciona novoProjeto ao array
    data[0].projetos.push(novoProjeto);
    //funcao para salvar o array data
    saveData(data);
    //funcao para salvar o select
    saveSelect(novoProjeto.id);

    //a funcao vai salvar o select ao terminar, pois assim, como o comportamento padrao de um formulario ao reiniciar a pagina é reiniciar, o projeto criado aparecerá na tela ao ser criado
  });

  //FECHAR
  //botao de fechar pop-up
  const closeButton = document.querySelector(".close-button");
  closeButton.addEventListener("click", () => {
    document.getElementById("popUpProjeto").classList.add("invisible");
    overlay.classList.remove("background-overlay");
    return;
  });
}

//criarNovaMovimentacao
export function adicionarNovaMovimentacao(data) {
  //MOSTRAR
  //deixar pop-up visivel
  const popUp = document.getElementById("popUpMovimentacao");
  popUp.classList.remove("invisible");
  //Overlay que vai ser atribuido a classe do blur
  const overlay = document.getElementById("overlayDiv");
  overlay.classList.add("background-overlay");

  const form = document.getElementById("movimentationForm");
  //ao enviar
  form.addEventListener("submit", (ev) => {
    //pega os valores dos inputs
    const saldoInput = document.getElementById("saldoNav");
    saldoInput.disabled = false;
    const saldoAtual = document.getElementById("saldoNav").value;
    saldoInput.disabled = true;
    const dataMovimentacao = document.getElementById("dataMovimentacao").value;
    const historicoMovimentacao = document.getElementById(
      "historicoMovimentacao"
    ).value;
    const documentoMovimentacao = document.getElementById(
      "documentoMovimentacao"
    ).value;
    const valorMovimentacao =
      document.getElementById("valorMovimentacao").value;
    const fornecedorMovimentacao = document.getElementById(
      "fornecedorMovimentacao"
    ).value;
    const nfMovimentacao = document.getElementById("nfMovimentacao").value;
    let bool = false;
    //se for entrada, bool é true, se for saida, bool é false
    if (document.getElementById("entradaMovimentacao").checked) {
      bool = true;
    } else if (document.getElementById("saidaMovimentacao").checked) {
      bool = false;
    }

    let dataString = dataMovimentacao.toString();

    //pega o projeto atual
    let select = getSelect();

    //percorre o array de projetos
    data[0].projetos.forEach((element) => {
      //se o id de projeto for igual o projeto
      if (element.id == select) {
        //cria novo lancamento
        let novoLancamento = {
          id: element.lancamentos.length + 1,
          dataMovimento: dataString,
          historico: historicoMovimentacao,
          documento: documentoMovimentacao,
          valor: parseFloat(valorMovimentacao),
          saldo: parseFloat(saldoAtual),
          fornecedor: fornecedorMovimentacao,
          notaFiscal: nfMovimentacao,
          entrada: bool,
        };

        //se for entrada, o saldo é saldo + valor, e se for saida, saldo - valor
        if (bool == true) {
          novoLancamento.saldo =
            parseFloat(saldoAtual) + parseFloat(valorMovimentacao);
        } else {
          novoLancamento.saldo =
            parseFloat(saldoAtual) - parseFloat(valorMovimentacao);
        }

        //adiciona novo lancamento ao inicio do array, dai ele fica no topo da tabela
        element.lancamentos.unshift(novoLancamento);
        //atualiza os dados do projeto (saldo, entrada e saida)
        element = atualizarDadosProjeto(element);

        //salva os dados
        saveData(data);
      }
    });

    //cria novo objeto movimentacao
  });
  //FECHAR
  //botao de fechar pop-up
  const closeButton = document.querySelector(".close-button-movement");
  closeButton.addEventListener("click", () => {
    document.getElementById("popUpMovimentacao").classList.add("invisible");
    overlay.classList.remove("background-overlay");
    return;
  });
}

export function removerMovimentacao(ev, data) {
  //pega a id do lancamento
  let idDoLancamento = ev.target.parentElement.parentElement.id;
  //pega o projeto atual
  let select = getSelect();

  data[0].projetos.forEach((projeto) => {
    //acha o projeto dentro do array data
    if (projeto.id == select) {
      //achar o lancamento dentro do valor projeto
      projeto.lancamentos.forEach((lancamento) => {
        if (lancamento.id == idDoLancamento) {
          //cria um novo array de lancamento aonde nao tem o lancamento que desejamos remover
          projeto.lancamentos = projeto.lancamentos.filter(
            (lancamentos) => lancamentos != lancamento
          );
        }
      });
    }
    //atualiza os dados do projeto
    projeto = atualizarDadosProjeto(projeto);
    //salva os dados
    saveData(data);
    //recarrega a página
    location.reload();
  });
}

// export function removerProjeto(ev, data) {
//   //pega a id do lancamento
//   let idDoLancamento = ev.target.parentElement.parentElement.id;
//   //pega o projeto atual
//   let select = getSelect();

//   data[0].projetos.forEach((projeto) => {
//     //acha o projeto dentro do array data
//     if (projeto.id == select) {
//       //achar o lancamento dentro do valor projeto
//       projeto.lancamentos.forEach((lancamento) => {
//         if (lancamento.id == idDoLancamento) {
//           //cria um novo array de lancamento aonde nao tem o lancamento que desejamos remover
//           projeto.lancamentos = projeto.lancamentos.filter(
//             (lancamentos) => lancamentos != lancamento
//           );
//         }
//       });
//     }
//     //atualiza os dados do projeto
//     projeto = atualizarDadosProjeto(projeto);
//     //salva os dados
//     saveData(data);
//     //recarrega a página
//     location.reload();
//   });
// }

export function removerProjeto(ev, data) {
  let idProjeto = ev.target.id;
  data[0].projetos.forEach((projeto) => {
    if (idProjeto == projeto.id) {
      data[0].projetos = data[0].projetos.filter(
        (projetos) => projetos != projeto
      );
      saveData(data);
      alert("Projeto Removido");
      location.reload();
    }
  });
}

//funcao de atualizar os dados do projeto, recebe como parametro o projeto que precisa ser atualizado
export function atualizarDadosProjeto(projeto) {
  //variavel para armazenar o valor total de entrada
  let somaDeEntradas = 0;
  projeto.lancamentos.forEach((element) => {
    if (element.entrada) {
      somaDeEntradas += element.valor;
    }
  });

  //variavel para armazenar o valor total de saida
  let somaDeSaidas = 0;
  projeto.lancamentos.forEach((element) => {
    if (!element.entrada) {
      somaDeSaidas += element.valor;
    }
  });

  //atribuicao de valores ao projeto
  projeto.entrada = somaDeEntradas;
  projeto.saida = somaDeSaidas;
  projeto.saldo = somaDeEntradas - somaDeSaidas;
  return projeto;
}


// export function novoUsuario(email, usuario, senha, confirmacaoSenha){
//   //Pega os dados coletados dos inputs de cadastro

//   //validação para saber se a confirmação de senha é igual a senha
//   if(senha != confirmacaoSenha){
//     console.log("Dados não são iguais")
//   }else{
//       //CRIA O OBJETO DE USUARIO
//       let novoUsuario = {
//         email: email,
//         usuario: usuario,
//         senha: senha,
//         confirmacaoSenha: confirmacaoSenha,
//       };
//       console.log(novoUsuario);
//       saveData(novoUsuario);
//   }
// }