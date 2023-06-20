const numeroDeMoedas = 40
let pontos = 0
const tempoInicial = 10
let tempo = 10
let timer = null

/* function criarElemento{

} */

let nome = prompt("Qual seu nome?")

function iniciaJogo() {
    pontos = 0
    tempo = tempoInicial
    let tela = document.getElementById("tela")
    tela.innerHTML = ""

    for (let i = 0; i < numeroDeMoedas; ++i) {
        let moeda = document.createElement("img")
        moeda.src = "bitcoin.jpg"
        moeda.id = "m" + i
        moeda.onclick = function () {
            pegaMoeda(this)
        }
        tela.appendChild(moeda)
        fetch('http://localhost:0/score')

            .then(response => {

                if (!response.ok) {

                    throw new Error('Erro na requisição');

                }

                return response.json();

            })

            .then(data => {

                console.log(data);

                const jogadores = data;

                jogadores.forEach(jogador => {

                    criarElemento(jogador.name, jogador.pontuacao);

                });

            })

            .catch(error => {

                console.error(error);

            });
    }

    timer = setInterval(contaTempo, 1000)
}

let rank = document.getElementById("rank").value

function mostraNomes() {
    let mostraNomes = document.getElementById("nomes")
    nome.innerText = mostraNomes
}

function pegaMoeda(moeda) {
    if (tempo <= 0) return

    moeda.onclick = null
    moeda.src = "cash.jpg"
    ++pontos

    let contadorPontos = document.getElementById("pontos")
    contadorPontos.innerText = pontos
}

function contaTempo() {
    --tempo
    let contadorPontos = document.getElementById("tempo")
    contadorPontos.innerText = tempo

    if (tempo <= 0) {
        clearInterval(timer)
        /* alert("Parabéns, voce fez " + pontos + " pontos!") */
        iniciaJogo()
    }
}