//2- PRINT.JS - AQUI QUE OCORRE O PROGRAMA
import {
  novoProjeto,
  adicionarNovaMovimentacao,
  removerMovimentacao,
  removerProjeto,
} from "./crud.js";
import { saveSelect, getSelect } from "./localStorage.js";

export function printData(data) {
  //adicionar novo projeto
  document
    .getElementById("addNewProjectButton")
    .addEventListener("click", (ev) => {
      novoProjeto(data);
    });

  //adicionar event listener de click
  document.addEventListener("click", (ev) => {
    //adicionar nova movimentacao
    if (ev.target.id == "newMovimentationButton") {
      adicionarNovaMovimentacao(data);
      //remover movimentacao
    } else if (ev.target.classList == "remover-lancamento") {
      removerMovimentacao(ev, data);
      //remover projeto
    } else if (ev.target.classList.contains("remove-project-button")) {
      removerProjeto(ev, data);
    }
  });

  const mainSection = document.getElementById("mainSection");
  const projectSelect = document.getElementById("projectSelect");
  //pega o valor do select armazenado
  const projectValue = getSelect();

  //VIRAR FUNCAO
  //1-
  //criar as opcoes dentro do select de projeto

  if (data[0].projetos.length != null) {
    data[0].projetos.forEach((element) => {
      //cria a opcao com o nome do projeto, e o valor da opcao igual ao id do projeto
      const option = document.createElement("option");
      option.id = element.id;
      option.value = element.id;
      option.innerText = element.titulo;
      projectSelect.append(option);
    });
  }
  //-----

  //o valor do projectSelect é igual ao valor armazenado
  projectSelect.value = projectValue;
  //se nao for 0, cria o projeto que estava antes
  if (projectSelect.value != 0) {
    carregarTabela(projectSelect.value, data[0].projetos);
  }

  //2-
  //Adicionar evento ao trocar de opcao
  projectSelect.addEventListener("change", (ev) => {
    //tira todo o conteudo da pagina
    mainSection.innerHTML = "";
    //se o valor for 0, quer dizer que o valor padrao do select é 'selecionar', dai some o conteudo, pois nenhum projeto esta selecionado
    if (projectSelect.value == 0) {
      saveSelect(projectSelect.value);
      mainSection.innerHTML = "";
    } else {
      saveSelect(projectSelect.value);
      carregarTabela(projectSelect.value, data[0].projetos);
    }
  });
  //----

  //funcao para achar o projeto para qual a tabela sera criada
  //recebe como parametro o valor do select após a troca e o array de dados
  function carregarTabela(valor, arr) {
    //percorre o array procurando o id de projeto igual o valor
    arr.forEach((element) => {
      if (valor == element.id) {
        //se encontrar, cria a tabela
        criarTabela(element);
      }
    });
  }
  //---

  //funcao para criar a tabela de projeto
  //recebe como parametro o projeto desejado para criar a tabela
  function criarTabela(projeto) {
    let titleDiv = document.createElement("div");
    titleDiv.classList.add("d-flex");
    titleDiv.classList.add("mb-3");
    let removeButton = document.createElement("button");
    removeButton.innerText = "X";
    removeButton.id = projeto.id;
    removeButton.classList.add(
      "btn",
      "btn-danger",
      "mx-3",
      "remove-project-button"
    );
    let title = document.createElement("h1");
    title.innerText = projeto.titulo.toUpperCase();
    title.classList.add("titulo-projeto");

    let nav = document.createElement("nav");
    nav.classList.add(
      "navbar",
      "navbar-expand-lg",
      "bg-body-tertiary",
      "border",
      "bg-opacity-75"
    );

    let firstDiv = document.createElement("div");
    firstDiv.classList.add("container-fluid");

    let secondDiv = document.createElement("div");
    secondDiv.classList.add("inputs", "d-flex");
    secondDiv.innerHTML = `
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">SALDO R$</span>
                        <input type="text" class="form-control" id="saldoNav" aria-describedby="basic-addon1" disabled value="${projeto.saldo.toFixed(
                          2
                        )}">
                    </div>
                    <div class=" input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">ENTRADA R$</span>
                        <input type="text" class="form-control" aria-describedby="basic-addon1" disabled value="${projeto.entrada.toFixed(
                          2
                        )}">
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">SAIDA R$</span>
                        <input type="text" class="form-control" aria-describedby="basic-addon1" disabled value="${projeto.saida.toFixed(
                          2
                        )}">
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Procurar</span>
                        <input type="text" class="form-control" id='searchBar' placeholder="Insira algum valor..." aria-describedby="basic-addon1">
                    </div>
                `;

    let iconesDiv = document.createElement("div");
    iconesDiv.classList.add("collapse", "navbar-collapse");
    iconesDiv.id = "navBarIcons";
    iconesDiv.innerHTML = `
                <ul class="navbar-nav px-3">
                <li class="nav-item">
                  <h3 class="nav-link"><svg class="cursor-pointer" id="newMovimentationButton" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="24" height="24"><path d="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25V4.664a.25.25 0 0 0-.073-.177l-2.914-2.914a.25.25 0 0 0-.177-.073Zm4.48 3.758a.75.75 0 0 1 .755.745l.01 1.497h1.497a.75.75 0 0 1 0 1.5H9v1.507a.75.75 0 0 1-1.5 0V9.005l-1.502.01a.75.75 0 0 1-.01-1.5l1.507-.01-.01-1.492a.75.75 0 0 1 .745-.755Z"></path></svg></h3>
                </li>
                <li class="nav-item">
                  <h3 class="nav-link"><svg class="cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M17.263 2.177a1.75 1.75 0 0 1 2.474 0l2.586 2.586a1.75 1.75 0 0 1 0 2.474L19.53 10.03l-.012.013L8.69 20.378a1.753 1.753 0 0 1-.699.409l-5.523 1.68a.748.748 0 0 1-.747-.188.748.748 0 0 1-.188-.747l1.673-5.5a1.75 1.75 0 0 1 .466-.756L14.476 4.963ZM4.708 16.361a.26.26 0 0 0-.067.108l-1.264 4.154 4.177-1.271a.253.253 0 0 0 .1-.059l10.273-9.806-2.94-2.939-10.279 9.813ZM19 8.44l2.263-2.262a.25.25 0 0 0 0-.354l-2.586-2.586a.25.25 0 0 0-.354 0L16.061 5.5Z"></path></svg></h3>
                </li>
                <li class="nav-item">
                  <h3 class="nav-link"><svg class="cursor-pointer invisible" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M3.5 3.75a.25.25 0 0 1 .25-.25h13.5a.25.25 0 0 1 .25.25v10a.75.75 0 0 0 1.5 0v-10A1.75 1.75 0 0 0 17.25 2H3.75A1.75 1.75 0 0 0 2 3.75v16.5c0 .966.784 1.75 1.75 1.75h7a.75.75 0 0 0 0-1.5h-7a.25.25 0 0 1-.25-.25V3.75Z"></path><path d="M6.25 7a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Zm-.75 4.75a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Zm16.28 4.53a.75.75 0 1 0-1.06-1.06l-4.97 4.97-1.97-1.97a.75.75 0 1 0-1.06 1.06l2.5 2.5a.75.75 0 0 0 1.06 0l5.5-5.5Z"></path></svg></h3>
                </li>
              </ul>
                `;

    let tableDiv = document.createElement("div");
    tableDiv.classList.add("overflow-auto");
    tableDiv.style.height = "50vh";
    let table = document.createElement("table");
    table.classList.add("table", "border-end", "border-start");
    let tableHead = document.createElement("thead");
    tableHead.innerHTML = ` 
                    <th scope="col" id="indiceHead">#</th>
                    <th scope="col" id="dataLancamentoHead">Data Lançamento</th>
                    <th scope="col" id="historicoHead">Histórico</th>
                    <th scope="col" id="documentoHead">Documento</th>
                    <th scope="col" id="valorHead">Valor</th>
                    <th scope="col" id="saldoHead">Saldo</th>
                    <th scope="col" id="fornecedorHead">Fornecedor</th>
                    <th scope="col" id="notaFiscalHead">Nota Fiscal</th>
                    <th scope="col">Remover</th>
                    `;

    let tableBody = document.createElement("tbody");
    projeto.lancamentos.forEach((element) => {
      let tabelRow = document.createElement("tr");
      tabelRow.id = element.id;
      let positivoOuNegativoBool = false;
      let positivoOuNegativo = "";
      if (element.entrada) {
        positivoOuNegativo = "+R$";
        positivoOuNegativoBool = true;
      } else {
        positivoOuNegativo = "-R$";
      }

      if (positivoOuNegativoBool) {
        tabelRow.innerHTML = `
                        <th scope="row" class="indice">${
                          projeto.lancamentos.indexOf(element) + 1
                        }</th>
                        <td  class="dataLancamento">${
                          element.dataMovimento
                        }</td>
                        <td  class="historico">${element.historico}</td>
                        <td  class="documento">${element.documento}</td>
                        <td  class="valor entrada">${
                          positivoOuNegativo + element.valor.toFixed(2)
                        }</td>
                        <td  class="saldo">R$${element.saldo.toFixed(2)}</td>
                        <td  class="fornecedor">${element.fornecedor}</td>
                        <td  class="notaFiscal">${element.notaFiscal}</td>
                        <td><svg class="remover-lancamento" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></td>
                        `;
      } else {
        tabelRow.innerHTML = `
        <th scope="row" class="indice">${
          projeto.lancamentos.indexOf(element) + 1
        }</th>
        <td  class="dataLancamento">${element.dataMovimento}</td>
        <td  class="historico">${element.historico}</td>
        <td  class="documento">${element.documento}</td>
        <td  class="valor saida">${
          positivoOuNegativo + element.valor.toFixed(2)
        }</td>
        <td  class="saldo">R$${element.saldo.toFixed(2)}</td>
        <td  class="fornecedor">${element.fornecedor}</td>
        <td  class="notaFiscal">${element.notaFiscal}</td>
        <td><svg class="remover-lancamento" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></td>
        `;
      }

      tableBody.append(tabelRow);
    });

    table.append(tableHead, tableBody);
    tableDiv.append(table);
    firstDiv.append(secondDiv, iconesDiv);
    nav.append(firstDiv);
    titleDiv.append(title, removeButton);
    mainSection.append(titleDiv, nav, tableDiv);

    let search = "";
    document.getElementById("searchBar").addEventListener("keydown", (ev) => {
      search = ev.target.value;
      if (ev.key != "Backspace") {
        search = search + ev.key;
      }
      console.log(search);
    });
  }
}
