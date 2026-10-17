const tarefa = document.querySelector(".tarefa");
const tarefas = document.querySelector(".areaTarefas");
const botaoAdicionar = document.querySelector(".btn-add");
const botaoLimparFiltros = document.querySelector(".limpar-filtros");

//  DIALOG

const janela = document.querySelector("#janela-tarefa");
const botaoSalvar = document.querySelector("#btn-salvar");
const botaoCancelar = document.querySelector("#btn-cancelar");

const descricaoTarefa = document.querySelector("#descricao-tarefa");
const prioridadeTarefa = document.querySelector("#prioridade-tarefa");
const categoriaTarefa = document.querySelector("#categoria-tarefa");

//   DIALOG


//   FILTROS

const filtros = document.querySelector(".filtros");

const filtroStatusTarefas = document.querySelector("#select-tarefas");
const filtroPrioridades = document.querySelector("#select-prioridades");
const filtroCategorias = document.querySelector("#select-categorias");
const filtroPesquisa = document.querySelector(".input-search");

//   FILTROS

const listaTarefas = [];

const contadorTotalTarefas = document.querySelector(".contador-total");
const contadorCompletedTarefas = document.querySelector(".contador-completed");
const contadorPendingTarefas = document.querySelector(".contador-pending");

function atualizaPainel () {
    contadorTotalTarefas.textContent = listaTarefas.length;
    
    let contador = 0;

    listaTarefas.forEach((novaTarefa) => {
        if (novaTarefa.concluida === true) {
            contador++;
        }
    });

    contadorCompletedTarefas.textContent = contador;

    contadorPendingTarefas.textContent = listaTarefas.length - contador;
}

botaoAdicionar.addEventListener("click", () => {
    if(tarefa.value.trim() === "") {
        alert('Escreva alguma tarefa.')
        return;
    }

    janela.showModal();
})

botaoCancelar.addEventListener("click", () => {
    janela.close();
})

botaoLimparFiltros.addEventListener("click", () => {
    filtroStatusTarefas.value = "todas-tarefas";
    filtroPrioridades.value = "todas-prioridades";
    filtroCategorias.value = "todas-categorias";
    filtroPesquisa.value = "";

    aplicarFiltros()
})

botaoSalvar.addEventListener("click", () => {
    if (prioridadeTarefa.value === "todas-prioridades") {
        alert('Selecione uma prioridade!')
        return;
    }

    if(categoriaTarefa.value === "todas-categorias") {
        alert('Selecione uma categoria!')
        return;
    }

    const novaTarefa = {
        nome: tarefa.value.trim(),
        descricao: descricaoTarefa.value,
        prioridade: prioridadeTarefa.value,
        categoria: categoriaTarefa.value,
        concluida: false
    }

    listaTarefas.push(novaTarefa);

    atualizaPainel()

    filtroStatusTarefas.value = "todas-tarefas";
    filtroPrioridades.value = "todas-prioridades";
    filtroCategorias.value = "todas-categorias";
    filtroPesquisa.value = "";
    
    aplicarFiltros()

    janela.close();


})


function renderizarTarefas(lista) {
    tarefas.innerHTML = "";

    if (lista.length === 0) {
        const estadoVazio = document.createElement("div");
        estadoVazio.classList.add("estado-vazio");

        const mensagem = document.createElement("p"); // paragrafo PARA INFORMAR QUE AINDA NÃO HÁ TAREFAS
        mensagem.classList.add("mensagem-vazia");
        mensagem.textContent = "nenhuma tarefa encontrada"

        const iconePrancheta = document.createElement("i"); // ICONE DA PRANCHETA
        iconePrancheta.classList.add("fa-solid", "fa-clipboard-list", "icone-prancheta");

        estadoVazio.appendChild(mensagem);
        estadoVazio.appendChild(iconePrancheta);

        tarefas.appendChild(estadoVazio);
        
        return;
    }

    for(let i = 0; i < lista.length; i++) {
        const tarefaAtual = lista[i];

        const novoItem = document.createElement("li"); // LISTA
        novoItem.classList.add("item-tarefa");

        const checkBox = document.createElement("input"); // CHECKBOX PRA DEFINIR TAREFA COMO FEITA OU NÃO
        checkBox.type = "checkbox";
        checkBox.classList.add("input-checkbox");
        checkBox.checked = tarefaAtual.concluida; // VERIFICA SE O CHECKBOX ESTAVA MARCADO OU NÃO

        checkBox.addEventListener("change", () => {
        tarefaAtual.concluida = checkBox.checked; // MARCA/ DESMARCA O CHECKBOX
        atualizaPainel()

        aplicarFiltros();

        nomeSpan.classList.toggle("concluida", checkBox.checked);
        })

        const nomeSpan = document.createElement("span"); // SPAN PRA GUARDAR O NOME DA TAREFA
        nomeSpan.classList.add("nome-span");
        nomeSpan.classList.toggle("concluida", tarefaAtual.concluida)

        const opcoesTarefa = document.createElement("div"); // DIV PARA GUARDAR, PRIORIDADE, EDICAO E LIXEIRA
        opcoesTarefa.classList.add("opcoes-tarefa");

        const prioridadeSpan = document.createElement("span"); // SPAN PRA GUARDAR A PRIORIDADE DA TAREFA
        prioridadeSpan.classList.add("prioridade-span");
        prioridadeSpan.setAttribute("aria-label", "Prioridade da Tarefa")
        prioridadeSpan.classList.add(tarefaAtual.prioridade);

        const botaoEditar = document.createElement("button"); // BUTTON EDITAR
        botaoEditar.type = "button";
        botaoEditar.setAttribute("aria-label", "Editar tarefa");
        botaoEditar.classList.add("button-editar");

        const botaoLixeira = document.createElement("button"); // BUTTON LIXEIRA
        botaoLixeira.type = "button";
        botaoLixeira.setAttribute("aria-label", "Excluir tarefa")
        botaoLixeira.classList.add("button-lixeira");

        const iconeLixeira = document.createElement("i"); // ICONE LIXEIRA
        iconeLixeira.classList.add("fa-regular", "fa-trash-can");

        const iconeEditar = document.createElement("i"); // ICONE EDITAR
        iconeEditar.classList.add("fa-regular", "fa-pen-to-square");

        botaoLixeira.appendChild(iconeLixeira);
        botaoEditar.appendChild(iconeEditar);

        nomeSpan.textContent = tarefaAtual.nome;
        prioridadeSpan.textContent = tarefaAtual.prioridade;

        opcoesTarefa.appendChild(prioridadeSpan);
        opcoesTarefa.appendChild(botaoEditar);
        opcoesTarefa.appendChild(botaoLixeira);

        novoItem.appendChild(checkBox);
        novoItem.appendChild(nomeSpan);
        novoItem.appendChild(opcoesTarefa);

        tarefas.appendChild(novoItem);
    }
}


janela.addEventListener("close" , () => {
    prioridadeTarefa.value = "todas-prioridades";
    categoriaTarefa.value = "todas-categorias";
    descricaoTarefa.value = "";
    tarefa.value = "";
})


function aplicarFiltros () {
    const tarefasFiltradas = listaTarefas.filter((tarefa) => {
        const statusCorrespondente = 
        (filtroStatusTarefas.value === "todas-tarefas") ||
        (filtroStatusTarefas.value === "concluida" && tarefa.concluida === true) ||
        (filtroStatusTarefas.value === "pendente" && tarefa.concluida === false);

        const prioridadeCorrespondente = 
        filtroPrioridades.value === "todas-prioridades" ||
        tarefa.prioridade === filtroPrioridades.value;

        const categoriaCorrespondente = 
        filtroCategorias.value === "todas-categorias" ||
        tarefa.categoria === filtroCategorias.value

        const pesquisaCorrespondente = 
        tarefa.nome.toLowerCase().includes(filtroPesquisa.value.toLowerCase());

        return statusCorrespondente && prioridadeCorrespondente && categoriaCorrespondente
        && pesquisaCorrespondente;
    })

    renderizarTarefas(tarefasFiltradas);
    
}

aplicarFiltros()

filtroStatusTarefas.addEventListener("change", aplicarFiltros);
filtroPrioridades.addEventListener("change", aplicarFiltros);
filtroCategorias.addEventListener("change", aplicarFiltros);

filtroPesquisa.addEventListener("input", aplicarFiltros);
