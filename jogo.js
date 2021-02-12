var timerId = null;

function iniciaJogo() {
    var url = window.location.search;
    var nivel_jogo = url.replace("?","");
    var tempo_segundos = 0;

    if(nivel_jogo == 1){//facil = 120 segundos
        tempo_segundos = 90;
    }
    if(nivel_jogo == 2){//normal = 60 segundos
        tempo_segundos = 60;
    }
    if(nivel_jogo == 3){//dificil = 30 segundos
        tempo_segundos = 30;
    }
    
    //inserindo segundos no elemento
    document.getElementById('cronometro').innerHTML = tempo_segundos;

    var qtde_baloes = 50;

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
    alert('Fim de jogo! Você não conseguiu estourar os balões a tempo!');
}

function cria_baloes(qtde_baloes){
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

function situacao_jogo(baloes_inteiros){
    if(baloes_inteiros == 0){
        //alert('Parabéns! Você conseguiu estourar todos os balões a tempo!');
        
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