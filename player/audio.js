const url = 'http://localhost/Spotifree/player/api/';

let htmlTelaArtistas = document.getElementById('tela-artistas');
let htmlArtistas = document.getElementById('artistas');
let htmlTelaPaginaArtista = document.getElementById('tela-pagina-artista');
let htmlAlbuns = document.getElementById('albuns');
let htmlTelaMusicas = document.getElementById('tela-musicas');
let htmlMusicas = document.getElementById('musicas');

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

let albunsRecebidos = [];
let albumAtual;

let artistasRecebidos = []
let artistaAtual;

let indexMusicaAtual = 0;
let clickouBarraTempo = 0;
let isNotTocando;


// Buscar musicas por album
/** Teste recuperar musicas por album */
function getMusicasPorAlbum(idAlbum) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            musicasRecebidas = JSON.parse(xhttp.responseText); // resposta da requisição (echo do php);
            escolherAlbumOuPlaylist();
        }
    };
    xhttp.open("GET", url + "getMusicasPorAlbum.php?idAlbum=" + idAlbum, true);
    xhttp.send();
}

// Buscar albuns por artista
/** Teste recuperar albuns por artista */
function getAlbunsPorArtista(artista) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            albunsRecebidos = JSON.parse(xhttp.responseText); // resposta da requisição (echo do php);
            gerarAlbuns();
            htmlTelaPaginaArtista.scrollIntoView();
        }
    };
    xhttp.open("GET", url + "getAlbunsPorArtista.php?idArtista=" + artista.id, true);
    xhttp.send();
}

function gerarAlbuns() {
    htmlAlbuns.innerHTML = '';
    albunsRecebidos.forEach(album => {
        htmlAlbuns.innerHTML +=
            '<div class="container separador pb-2 pt-2">' +
            '<div class="row">' +
            '<div class="album-foto">' +
            '<img class="rounded-circle" src="data:image/png;base64,' + album.capa + '" alt="">' +
            '</div>' +
            '<div class="album-info">' +
            'Album: <span class="album-nome">' + album.titulo + '</span><br>' +
            'Ano de lançamento: <span class="album-lancamento">' + album.lancamento + '</span><br>' +
            '<span class="album-ir-para" onclick="getMusicasPorAlbum(' + album.id + ')">Ouvir album</span>' +
            '</div>' +
            '</div>' +
            '</div>'
    });
}

// Buscar artistas
/** Teste recuperar artista */
function getArtistas() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            artistasRecebidos = JSON.parse(xhttp.responseText); // resposta da requisição (echo do php);
            gerarArtistas();
        }
    };
    xhttp.open("GET", url + "getArtistas.php?", true);
    xhttp.send();
}

function gerarArtistas() {
    htmlArtistas.innerHTML = '';
    artistasRecebidos.forEach(artista => {
        let htmlCardArtista = document.createElement('div');
        htmlCardArtista.classList.add('pt-4', 'col-xl-3', 'col-lg-4', 'col-md-4', 'col-sm-6', 'col-12', 'text-center');
        htmlArtistas.appendChild(htmlCardArtista);

        let htmlImgArtista = document.createElement('img');
        htmlImgArtista.classList.add('rounded-circle', 'artistas-foto-artista');
        htmlImgArtista.src = 'data:image/png;base64,' + artista.imagemArtista;
        htmlImgArtista.addEventListener('click', () => getAlbunsPorArtista(artista));
        htmlCardArtista.appendChild(htmlImgArtista);

        let htmlNomeArtista = document.createElement('div');
        htmlNomeArtista.classList.add('mt-3', 'artistas-nome-artista');
        htmlNomeArtista.addEventListener('click', () => getAlbunsPorArtista(artista));
        htmlNomeArtista.innerText = artista.artista;
        htmlCardArtista.appendChild(htmlNomeArtista);
    });
}
function formatarNumeroComPonto(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, "\.");
}
getArtistas();


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

function escolherAlbumOuPlaylist() {
    indexMusicaAtual = 0;
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

document.addEventListener('mousemove', () => {
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

