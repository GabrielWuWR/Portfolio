/***********************************************************************************
* Objetivo: Desenvolver as lógicas principais de comunicação com as apis do projeto.
* Autor: Gabriel
* Data: 12/02/2026
* Versão: 1.0.13.2
*
***********************************************************************************/
//Importando o json de frases do outro arquivo
import { frases } from './data/falas.js';

//Função que escreve uma frase aleatoria de anime
function escreverFraseAleatoria() {
    //Criando as váriaveis dos elementos
    let frase = document.getElementById('frase');
    let autor = document.getElementById('autor');
    let nomeAnime = document.getElementById('animeName');

    let numeroRandom = Math.floor(Math.random() * frases.length); //Escolhe um numero aleatório dentro do indice do array de frases
    let letras = frases[numeroRandom].quote.length; //Salvando a quantidade de letras que a frase tem

    //Se a frase tiver mais de 150 caracteres escolhemos outra, fazemos isso para evitar um bug visual
    if (letras > 150) {
        escreverFraseAleatoria();
    } else {
        //Caso a frase tenha uma quantidade legal de caracteres então usamos ela
        frase.textContent = frases[numeroRandom].quote;
        autor.textContent = `~${frases[numeroRandom].character}`;
        nomeAnime.textContent = frases[numeroRandom].anime;
    };
}

escreverFraseAleatoria(); //Chamando a função para escrever uma frase aleatória