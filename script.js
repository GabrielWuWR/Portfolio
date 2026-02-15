/***********************************************************************************
* Objetivo: Desenvolver as lógicas principais de comunicação com as apis do projeto.
* Autor: Gabriel
* Data: 12/02/2026
* Versão: 1.0.13.2
*
***********************************************************************************/
'use strict';

//Importando o json de frases do outro arquivo
import { frases } from './data/falas.js';


//Função que traduz frases
async function traduzirFrases(frase, idiomaOriginal, idiomaTraducao) {
    //Criando as variaveis de manipulação
    let texto = frase;
    let original = idiomaOriginal;
    let traducao = idiomaTraducao;

    //Montando a url que faremos a requisição
    let urlIdiomas = `${original}|${traducao}`; //Primeiro concatenamos os dois idiomas que faremos a tradução
    let fraseUrl = encodeURIComponent(texto); //Depois formatamos a frase que a pessoa digitar para o formato de url
    let url = `https://api.mymemory.translated.net/get?q=${fraseUrl}&langpair=${urlIdiomas}`; //Por fim montamos a url final

    //Fazendo os pedidos para a api
    const respostaApi = await fetch(url); //Primeiro fazemos o fetch da url para obter a resposta da api
    const dados = await respostaApi.json(); //Ela retorna um json então guardamos ele nessa variavel

    //Tratamento de erros
    if (dados && dados.responseData) { // Se a api retornar tudo certinho ele devolve a frase traduzida
        return dados.responseData.translatedText; //Frase traduzida
    } else {
        return original; //Se a tradução der errado voltamos a frase original
    }
};


//Função que escreve uma frase aleatoria de anime
async function escreverFraseAleatoria() {
    //Criando as váriaveis dos elementos
    let frase = document.getElementById('frase');
    let autor = document.getElementById('autor');
    let nomeAnime = document.getElementById('animeName');

    let numeroRandom = Math.floor(Math.random() * frases.length); //Escolhe um numero aleatório dentro do indice do array de frases
    let letras = frases[numeroRandom].quote.length; //Salvando a quantidade de letras que a frase tem
    //let fraseTraduzida = await traduzirFrases(frases[numeroRandom].quote, 'en', 'pt'); //Aqui chamamos a função traduzir frases, é necessario sempre chamar o await pois se trata de uma resposta de api

    //Se a frase tiver mais de 140 caracteres escolhemos outra, fazemos isso para evitar um bug visual
    if (letras > 140) {
        escreverFraseAleatoria();
    } else {
        //Caso a frase tenha uma quantidade legal de caracteres então usamos ela
        //frase.textContent = fraseTraduzida;
        autor.textContent = `~${frases[numeroRandom].character}`;
        nomeAnime.textContent = frases[numeroRandom].anime;
    };
}

escreverFraseAleatoria(); //Chamando a função para escrever uma frase aleatória

