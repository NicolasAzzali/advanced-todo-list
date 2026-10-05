const tarefa = document.querySelector(".tarefa");
const tarefas = document.querySelector("areaTarefas");
const botaoAdicionar = document.querySelector(".btn-add");

const janela = document.querySelector("#janela-tarefa");
const botaoSalvar = document.querySelector("#btn-salvar");
const botaoCancelar = document.querySelector("#btn-cancelar");


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