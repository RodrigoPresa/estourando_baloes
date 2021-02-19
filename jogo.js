var timerId = null;

var url = window.location.search;
var nivel_jogo = url.replace("?","");
var tempo_segundos = 0;

if(nivel_jogo == 1){//facil = 60 segundos
    tempo_segundos = 60;
}
if(nivel_jogo == 2){//normal = 45 segundos
    tempo_segundos = 45;
}
if(nivel_jogo == 3){//dificil = 30 segundos
    tempo_segundos = 30;
}

function iniciaJogo() {
    //zerando a pontuação
    document.getElementById('pontos').textContent = 0;  

    //inserindo segundos no elemento
    document.getElementById('cronometro').innerHTML = tempo_segundos;

    var qtde_baloes = 70;

    cria_baloes(qtde_baloes);

    document.getElementById('baloes_inteiros').innerHTML = qtde_baloes;
    document.getElementById('baloes_estourados').innerHTML = 0;    

    contagem_tempo(tempo_segundos + 1);
}

function contagem_tempo(segundos){
    segundos = segundos - 1;
    if(segundos == -1){
        clearTimeout(timerId);  //para a execução da função setTimeout
        game_over();
        return false;
    }
    document.getElementById('cronometro').innerHTML = segundos;
    timerId = setTimeout("contagem_tempo("+segundos+")", 1000);
}

function game_over(){
    remove_eventos_baloes();
    mostraModal("Você não conseguiu estourar os balões a tempo!");
}

function cria_baloes(qtde_baloes){
    document.getElementById('cenario').innerHTML = ""; //limpa a div cenário para a inserção dos balões
    for (var i = 1; i <= qtde_baloes; i++){
        var balao = document.createElement('img');
        balao.src = 'imagens/balao_azul_pequeno.png';
        balao.style = 'margin: 12px';
        balao.id = 'b'+i;
        balao.onclick = function(){
            estourar(this);
        }

        document.getElementById('cenario').appendChild(balao);
    }
}

function estourar(e){
    balaoId = e.id;
    document.getElementById(balaoId).setAttribute("onclick","");
    document.getElementById(balaoId).src = 'imagens/balao_azul_pequeno_estourado.png';

    pontuacao(-1);
    pontos(10);
}

function pontuacao(acao){
    var baloes_inteiros = document.getElementById('baloes_inteiros').innerHTML;
    var baloes_estourados = document.getElementById('baloes_estourados').innerHTML;

    baloes_inteiros = parseInt(baloes_inteiros);
    baloes_estourados = parseInt(baloes_estourados);

    baloes_inteiros = baloes_inteiros + acao;
    baloes_estourados = baloes_estourados - acao;

    document.getElementById('baloes_inteiros').innerHTML = baloes_inteiros;
    document.getElementById('baloes_estourados').innerHTML = baloes_estourados;

    situacao_jogo(baloes_inteiros);
}

function pontos(pts){
    var pontos_tela = parseInt(document.getElementById('pontos').textContent);
    pontos_tela = pontos_tela + pts;
    document.getElementById('pontos').innerHTML = pontos_tela;
}

function situacao_jogo(baloes_inteiros){
    if(baloes_inteiros == 0 && nivel_jogo != 3){
        mostraModal("Parabéns! Você acha que está pronto para o próximo nível?");
        parar_jogo();
    }
    else if(baloes_inteiros == 0 && nivel_jogo == 3){
        mostraModal("Você é uma lenda! Parabéns!");
        parar_jogo();
    }
}

function parar_jogo(){
    clearTimeout(timerId);
    return false;
}

function remove_eventos_baloes(){
    var i = 1;

    while(document.getElementById('b'+i)){
        document.getElementById('b'+i).onclick = '';
        i++;
    }
}

function mostraModal(modalText) {
    document.querySelector('.mensagem').innerText = modalText;
    var modal = document.querySelector('.modal-background');
    modal.classList.remove('display-none');
}


// LISTENERS
document.getElementById("menu-inicial").addEventListener("click", function() {
    window.location.href = 'index.html';
});

document.getElementById("recomeco-nivel").addEventListener("click", function() { 
    document.querySelector('.modal-background').classList.add('display-none');
    iniciaJogo();
});

