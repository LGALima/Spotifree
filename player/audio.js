const url = 'http://localhost/audio/teste1/api/';

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

let srcMusicas = [];

let musicaAtual = 0;
let clickouBarraTempo = 0;
let isNotTocando;

/** teste de conexão com outro arquvio php */
var xhttp = new XMLHttpRequest();
// após ser feito a requisição
xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        srcMusicas = JSON.parse(xhttp.responseText); // resposta da requisição (echo do php);
        console.log(JSON.parse(xhttp.responseText))
        atualizarInfoMusica();
    }
};

// Buscar musicas por album
function getMusicasPorAlbum() {
    xhttp.open("GET", url + "getMusicasPorAlbum.php?idAlbum=1", true);
    xhttp.send();
    /** MANDAR COM POST
     * xhttp.open("POST", "http://localhost/audio/teste1/api/getMusicasPorAlbum.php", true);
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhttp.send('idAlbum=1');
     */
}

getMusicasPorAlbum();

function trocarMusica(avancar) {
    if (avancar && musicaAtual + 1 < srcMusicas.length) {
        musicaAtual++;
    } else if (!avancar && musicaAtual - 1 >= 0) {
        musicaAtual--;
    } else if (avancar) {
        musicaAtual = 0;
    } else if (!avancar) {
        musicaAtual = srcMusicas.length - 1;
    }

    atualizarInfoMusica();
    musica.play();
};

function playMusica() {
    if (!musica.src) {
        alert('escolha uma musica');
        return;
    }

    musica.play();
    btnPlayerPlay.style.display = 'none';
    btnPlayerPause.style.display = 'inline';
};

function pausarMusica() {
    musica.pause();
    btnPlayerPlay.style.display = 'inline';
    btnPlayerPause.style.display = 'none';
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
    musica.src = 'data:audio/mp3;base64,' + srcMusicas[musicaAtual].musica;
    capaAlbum.src = 'data:image/jpeg;base64,' + srcMusicas[musicaAtual].capa;
    descricaoMusica.innerHTML = srcMusicas[musicaAtual].titulo_musica + '<br>' + srcMusicas[musicaAtual].titulo_album + '<br>' + srcMusicas[musicaAtual].artista;
}


musica.addEventListener('timeupdate', () => {
    tempoBarraTocado.style.width = (musica.currentTime / musica.duration * 100) + '%';
    if (musica.currentTime >= musica.duration) {
        trocarMusica(true);
    }
    tempoTocado.innerText = converterSegundosParaMinutoSegundo(musica.currentTime);
    tempoTotal.innerText = converterSegundosParaMinutoSegundo(musica.duration);
});

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

document.addEventListener('mousemove', () => {
    if (clickouBarraTempo === 1) {
        musica.currentTime = (musica.duration * ((event.clientX - tempoBarraMusica.offsetLeft) / tempoBarraMusica.offsetWidth));
    }
});

document.addEventListener('mouseup', () => {
    if(clickouBarraTempo === 1) {
        clickouBarraTempo = 0;
        if(!isNotTocando) {
            playMusica();
        }
    }
});
