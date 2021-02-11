<h1 align="center"> Estourando Balões </h1>
<p align="justify"> Exercício prático utilizando JavaScript </p>
<hr>
<p>Este é um exercício do "Curso completo de Desenvolvimento Web", oferecido pelo Udemy e ministrado pelo prof. Jorge Sant'Ana. Consiste em um jogo em que o seu objetivo é
estourar todos os balões na tela dentro do limite de tempo estabelecido de acordo com a dificuldade escolhida</p>

### Níveis do jogo:
- Fácil: 120 segundos;
- Médio: 60 segundos;
- Difícil: 30 segundos;

O jogo é composto por duas telas:

- index.html, que possui um select para escolher o nível de dificuldade e um botão para iniciar o jogo;
- jogo.html, onde está a tela do jogo;

A lógica encontra-se no arquivo jogo.js.

Selecionar o nível do jogo e pressionar o botão iniciar irá redirecioná-lo para a tela jogo.html, através da função iniciaJogo().

Já na tela jogo, são apresentadas as seguintes funcionalidades:

- Contador de balões inteiros e estourados - Atualizada através da função pontuacao(acao), que decrementa o valor da variável baloes_inteiros e incrementa o valor da variável baloes_estourados através do parâmetro da função;

- Cronômetro - Setado de acordo com a dificuldade escolhida, é executada a função contagem_tempo(segundos) que, através da função setTimeout() realiza o decremento do contador .


- Tela de jogo - Onde são criados os balões para o jogo. Ao iniciar o jogo é chamada a função iniciaJogo(), que recupera o nível do jogo através da URL e determina o tempo do cronômetro.
	Os balões são criados pela função cria_baloes(qtde_baloes) por um laço de repetição, que utiliza o createElement para criar tags img de acordo com o valor passado no parâmetro, adicionando cada tag como filha da div "cenário". Nesta função também são atribuidos um id para cada img e um evento onclick.
	Ao acionar o evento onclick é chamada a função estourar(), que remove o onclick do balão selecionado e altera a imagem do balão.

Caso o jogador consiga estourar todos os balões a tempo, a função situacao_jogo(baloes_inteiros) é chamada. Esta função determina que quando a quantidade de balões inteiros for igual a 0, o cronômetro para e um alert é apresentado informando o fim do jogo.

:warning: Projeto ainda em desenvolvimento. Ainda serão implementadas novas funcionalidades, além das apresentadas no curso.
