const tarefa = document.querySelector(".tarefa");
const tarefas = document.querySelector(".areaTarefas");
const botaoAdicionar = document.querySelector(".btn-add");

const janela = document.querySelector("#janela-tarefa");
const botaoSalvar = document.querySelector("#btn-salvar");
const botaoCancelar = document.querySelector("#btn-cancelar");

const descricaoTarefa = document.querySelector("#descricao-tarefa");
const prioridadeTarefa = document.querySelector("#prioridade-tarefa");
const categoriaTarefa = document.querySelector("#categoria-tarefa");

const listaTarefas = [];

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

    const novoItem = document.createElement("li"); // LISTA
    novoItem.classList.add("item-tarefa");

    const checkBox = document.createElement("input"); // CHECKBOX PRA DEFINIR TAREFA COMO FEITA OU NÃO
    checkBox.type = "checkbox";
    checkBox.classList.add("input-checkbox");

    const nomeSpan = document.createElement("span"); // SPAN PRA GUARDAR O NOME DA TAREFA
    nomeSpan.classList.add("nome-span");

    const opcoesTarefa = document.createElement("div"); // DIV PARA GUARDAR, PRIORIDADE, EDICAO E LIXEIRA
    opcoesTarefa.classList.add("opcoes-tarefa");

    const prioridadeSpan = document.createElement("span"); // SPAN PRA GUARDAR A PRIORIDADE DA TAREFA
    prioridadeSpan.classList.add("prioridade-span");

    prioridadeSpan.classList.add(novaTarefa.prioridade);

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

    nomeSpan.textContent = novaTarefa.nome;
    prioridadeSpan.textContent = novaTarefa.prioridade;

    opcoesTarefa.appendChild(prioridadeSpan);
    opcoesTarefa.appendChild(botaoEditar);
    opcoesTarefa.appendChild(botaoLixeira);

    novoItem.appendChild(checkBox);
    novoItem.appendChild(nomeSpan);
    novoItem.appendChild(opcoesTarefa);

    tarefas.appendChild(novoItem);

    janela.close();
})

janela.addEventListener("close" , () => {
    prioridadeTarefa.value = "todas-prioridades";
    categoriaTarefa.value = "todas-categorias";
    descricaoTarefa.value = "";
    tarefa.value = "";
})