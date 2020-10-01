let musica = document.getElementById("musica");
let player = document.getElementById("player");

let tempoBarraTocado = document.getElementsByClassName("tempo-barra-tocado")[0];
let tempoBarraMusica = document.getElementsByClassName("tempo-barra-musica")[0];
let tempoTocado = document.getElementById("tempo-tocado");
let tempoTotal = document.getElementById("tempo-total");

let capaAlbum = document.getElementById("capa-album");
let descricaoMusica = document.getElementById('descricao-musica');

let btnPlayerPlay = document.getElementById('player-play');
let btnPlayerPause = document.getElementById('player-pause');

let musicasFilaDeReproducao = [];
let musicasRecebidas = [];

let indexMusicaAtual = 0;
let clickouBarraTempo = 0;
let isNotTocando;


function trocarMusica(avancar) {
    if (avancar && indexMusicaAtual + 1 < musicasFilaDeReproducao.length) {
        indexMusicaAtual++;
    } else if (!avancar && indexMusicaAtual - 1 >= 0) {
        indexMusicaAtual--;
    } else if (avancar) {
        indexMusicaAtual = 0;
    } else if (!avancar) {
        indexMusicaAtual = musicasFilaDeReproducao.length - 1;
    }

    atualizarInfoMusica();
    musica.play();
};

function playMusica() {
    if (!musica.src) {
        alert('escolha um album/playlist');
        return;
    }

    musica.play();
    btnPlayerPlay.hidden = true;
    btnPlayerPause.hidden = false;
};

function pausarMusica() {
    musica.pause();
    btnPlayerPlay.hidden = false;
    btnPlayerPause.hidden = true;
};

function converterSegundosParaMinutoSegundo(segundos) {
    segundos = segundos ? Math.round(segundos) : 0;
    minutos = 0;
    while (segundos > 59) {
        minutos++;
        segundos -= 60;
    }

    let minutoSegundo = (minutos < 10 ? '0' + minutos : minutos) + ':' + (segundos < 10 ? '0' + segundos : segundos);

    return minutoSegundo;
}

function atualizarInfoMusica() {
    musica.src = 'data:audio/mp3;base64,' + musicasFilaDeReproducao[indexMusicaAtual].musica;
    capaAlbum.src = 'data:image/png;base64,' + musicasFilaDeReproducao[indexMusicaAtual].album.capa;
    descricaoMusica.innerHTML = musicasFilaDeReproducao[indexMusicaAtual].titulo + '<br>' + musicasFilaDeReproducao[indexMusicaAtual].album.titulo + '<br>' + musicasFilaDeReproducao[indexMusicaAtual].album.artista.artista;
}

/**
 * @description
 * Seleciona um conjunto de musicas, caso seja passado a posiçaõ, será começado a partir da mesma.
 */
function selecionarMusica(index) {
    indexMusicaAtual = index ? index : 0;
    musicasFilaDeReproducao = JSON.parse(JSON.stringify(musicasRecebidas));
    atualizarInfoMusica();
    playMusica();
}

function atualizarTempo() {
    tempoBarraTocado.style.width = (musica.currentTime / musica.duration * 100) + '%';
    if (musica.currentTime >= musica.duration) {
        trocarMusica(true);
    }
    tempoTocado.innerText = converterSegundosParaMinutoSegundo(musica.currentTime);
    tempoTotal.innerText = converterSegundosParaMinutoSegundo(musica.duration);
}

function adicionarAFilaDeReproducao(musica) {
    if (musicasFilaDeReproducao.length === 0) {
        indexMusicaAtual = 0;
        musicasFilaDeReproducao.push(musica);
        atualizarInfoMusica();
        playMusica();
    } else {
        let novaFilaDeReproducao = [];
        musicasFilaDeReproducao.forEach((musicaFila, index) => {
            novaFilaDeReproducao.push(musicaFila);
            if(index === indexMusicaAtual) {
            novaFilaDeReproducao.push(musica);
            }
        });
        musicasFilaDeReproducao = novaFilaDeReproducao;
    }
}

musica.addEventListener('timeupdate', atualizarTempo);

musica.addEventListener('pause', () => {
    pausarMusica();
});

musica.addEventListener('play', () => {
    playMusica();
});

tempoBarraMusica.addEventListener('mousedown', (event) => {
    clickouBarraTempo = 1;
    isNotTocando = musica.paused;
    pausarMusica();
    musica.currentTime = (musica.duration * ((event.clientX - tempoBarraMusica.offsetLeft) / tempoBarraMusica.offsetWidth));
});

document.addEventListener('mousemove', (event) => {
    if (clickouBarraTempo === 1) {
        musica.currentTime = (musica.duration * ((event.clientX - tempoBarraMusica.offsetLeft) / tempoBarraMusica.offsetWidth));
    }
});

document.addEventListener('mouseup', () => {
    if (clickouBarraTempo === 1) {
        clickouBarraTempo = 0;
        if (!isNotTocando) {
            playMusica();
        }
    }
});