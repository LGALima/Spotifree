const url = 'http://localhost/Spotifree/player/api/';

let htmlTelaArtistas = document.getElementById('tela-artistas');
let htmlArtistas = document.getElementById('artistas');
let htmlTelaPaginaArtista = document.getElementById('tela-pagina-artista');
let htmlAlbuns = document.getElementById('albuns');
let htmlTelaMusicas = document.getElementById('tela-musicas');
let htmlMusicas = document.getElementById('musicas');

let inputPesquisarArtistas = document.getElementById('input-pesquisar-artistas');
let btnPesquisarArtistas = document.getElementById('btn-pesquisar-artistas')

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
function getMusicasPorAlbum(album) {
    let xhttp = new XMLHttpRequest();
    let response;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            response = JSON.parse(xhttp.responseText);
        }
    };
    xhttp.open("GET", url + "getMusicasPorAlbum.php?idAlbum=" + album.id + '&idUsuario=' + idUsuario, false);
    xhttp.send();
    return response;
}

function getMusicaPorId(idMusica) {
    let xhttp = new XMLHttpRequest();
    let response;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            response = JSON.parse(xhttp.responseText);
        }
    };
    xhttp.open("GET", url + "getMusicaPorId.php?idUsuario=" + idUsuario + "&idMusica=" + idMusica, false);
    xhttp.send();
    return response;
}

function deleteCreateMusicaLike(musica) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(xhttp.responseText);
        }
    };
    xhttp.open("GET", url + 'deleteCreateMusicaLike.php?idLike=' + musica.idLike + '&idMusica=' + musica.id + '&idUsuario=' + idUsuario, false);
    xhttp.send();
}

// Buscar albuns por artista
function getAlbunsPorArtista(artista) {
    artistaAtual = artista;
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            albunsRecebidos = JSON.parse(xhttp.responseText); // resposta da requisição (echo do php);
            gerarAlbuns();
            htmlTelaPaginaArtista.scrollIntoView();
        }
    };
    xhttp.open("GET", url + "getAlbunsPorArtista.php?idArtista=" + artista.id, false);
    xhttp.send();
}

// Gera cada album com suas respectivas musicas
function gerarAlbuns() {
    let htmlHeaderTituloNomeArtista = document.getElementById('nome-artista');
    htmlHeaderTituloNomeArtista.innerText = artistaAtual.artista;
    htmlAlbuns.innerHTML = '';
    albunsRecebidos.forEach(album => {
        let divColHeader = document.createElement('div');
        divColHeader.classList.add('col-12');
        htmlAlbuns.appendChild(divColHeader);

        let divAlbumHeader = document.createElement('div');
        divAlbumHeader.classList.add('album-header');
        divColHeader.appendChild(divAlbumHeader);

        let divAlbumImagemAlbum = document.createElement('div');
        divAlbumImagemAlbum.classList.add('album-imagem-album');
        divAlbumHeader.appendChild(divAlbumImagemAlbum);

        let imgAlbum = document.createElement('img');
        imgAlbum.src = 'data:image/png;base64,' + album.capa;
        divAlbumImagemAlbum.appendChild(imgAlbum);

        let divAlbumInfo = document.createElement('div');
        divAlbumInfo.classList.add('album-info');
        divAlbumHeader.appendChild(divAlbumInfo);

        let divAlbumLancamento = document.createElement('div');
        divAlbumLancamento.classList.add('album-lancamento');
        divAlbumLancamento.innerText = album.lancamento;
        divAlbumInfo.appendChild(divAlbumLancamento);

        let divAlbumTitulo = document.createElement('div');
        divAlbumTitulo.classList.add('album-titulo');
        divAlbumTitulo.innerText = album.titulo;
        divAlbumInfo.appendChild(divAlbumTitulo);

        ////

        let divColBody = document.createElement('div');
        divColBody.classList.add('col-12', 'album-body');
        htmlAlbuns.appendChild(divColBody);

        let tableAlbuns = document.createElement('table');
        divColBody.appendChild(tableAlbuns);

        let trHeaderAlbuns = document.createElement('tr');
        tableAlbuns.appendChild(trHeaderAlbuns);

        let thIndiceAlbuns = document.createElement('th');
        thIndiceAlbuns.classList.add('album-tabela-indice');
        thIndiceAlbuns.innerText = '#';
        trHeaderAlbuns.appendChild(thIndiceAlbuns);

        let thLikeAlbuns = document.createElement('th');
        thLikeAlbuns.classList.add('album-tabela-like');
        thLikeAlbuns.innerText = '';
        trHeaderAlbuns.appendChild(thLikeAlbuns);

        let thTituloAlbuns = document.createElement('th');
        thTituloAlbuns.classList.add('album-tabela-titulo');
        thTituloAlbuns.innerText = 'Título'
        trHeaderAlbuns.appendChild(thTituloAlbuns);

        let thAddFilaAlbuns = document.createElement('th');
        thAddFilaAlbuns.classList.add('album-tabela-indice');
        thAddFilaAlbuns.innerText = '';
        trHeaderAlbuns.appendChild(thAddFilaAlbuns);

        let thTempoAlbuns = document.createElement('th');
        thTempoAlbuns.classList.add('album-tabela-tempo');
        thTempoAlbuns.innerText = 'Tempo';
        trHeaderAlbuns.appendChild(thTempoAlbuns);

        album.musicas = getMusicasPorAlbum(album);

        divAlbumImagemAlbum.addEventListener('click', () => {
            musicasRecebidas = album.musicas;
            selecionarMusica();
        });

        // caso nao tenha nenhum elemento exibe um mensagem
        if (album.musicas.length === 0) {
            let trBodyAlbuns = document.createElement('tr');
            tableAlbuns.appendChild(trBodyAlbuns);

            let tdInfo = document.createElement('td');
            tdInfo.colSpan = 6;
            tdInfo.classList.add('text-center');
            tdInfo.innerText = 'Sem musicas neste album';
            trBodyAlbuns.appendChild(tdInfo);
            return;
        }
        // Itera as musicas recem recebida para montar as rows de musica
        album.musicas.forEach((musica, index) => {
            let trBodyAlbuns = document.createElement('tr');
            tableAlbuns.appendChild(trBodyAlbuns);

            let tdIndice = document.createElement('td');
            trBodyAlbuns.appendChild(tdIndice);

            let spanIndice = document.createElement('span');
            spanIndice.innerText = index + 1;
            tdIndice.appendChild(spanIndice);

            let iconeTocarIndice = document.createElement('i');
            iconeTocarIndice.classList.add('fa', 'fa-fw', 'fa-play');
            iconeTocarIndice.hidden = true;
            tdIndice.appendChild(iconeTocarIndice);

            tdIndice.addEventListener('mouseenter', () => {
                spanIndice.hidden = true;
                iconeTocarIndice.hidden = false;
            });

            tdIndice.addEventListener('mouseleave', () => {
                spanIndice.hidden = false;
                iconeTocarIndice.hidden = true;
            });

            // começa a tocar a musica a partir do index que está
            tdIndice.addEventListener('click', () => {
                musicasRecebidas = album.musicas;
                selecionarMusica(musicasRecebidas.indexOf(musica));
            });


            let tdLike = document.createElement('td');
            trBodyAlbuns.appendChild(tdLike);

            let iconeLike = document.createElement('i');
            iconeLike.classList.add((musica.idLike == -1 ? 'far' : 'fas'), 'fa-fw', 'fa-heart');
            tdLike.appendChild(iconeLike);

            iconeLike.addEventListener('click', () => {
                deleteCreateMusicaLike(musica);
                let musicaAtualizada = getMusicaPorId(musica.id);
                musica.idLike = musicaAtualizada.idLike;
                iconeLike.classList.add((musica.idLike == -1 ? 'far' : 'fas'));
                iconeLike.classList.remove((musica.idLike != -1 ? 'far' : 'fas'));
            });

            let tdTitulo = document.createElement('td');
            tdTitulo.innerText = musica.titulo;
            trBodyAlbuns.appendChild(tdTitulo);

            let tdAddFila = document.createElement('td');
            trBodyAlbuns.appendChild(tdAddFila);

            let iconeAdicionarAFila = document.createElement('i');
            iconeAdicionarAFila.classList.add('fa', 'fa-fw', 'fa-plus');
            iconeAdicionarAFila.title = "Adicionar a fila";
            tdAddFila.appendChild(iconeAdicionarAFila);

            iconeAdicionarAFila.addEventListener('click', () => adicionarAFilaDeReproducao(musica));

            let tdTempo = document.createElement('td');
            tdTempo.innerText = musica.tempo;
            trBodyAlbuns.appendChild(tdTempo);
        });
    });
}

// Buscar artistas
/** Teste recuperar artista */
function getArtistas(pesquisa) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            artistasRecebidos = JSON.parse(xhttp.responseText); // resposta da requisição (echo do php);
            gerarArtistas();
        }
    };
    xhttp.open("GET", url + "getArtistas.php?pesquisa=" + (pesquisa ? pesquisa : ''), false);
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
        let musicasAnteriores = musicasFilaDeReproducao.splice(0, indexMusicaAtual);
        let musicasPosteriores = musicasFilaDeReproducao.splice(indexMusicaAtual, musicasFilaDeReproducao.length);

        musicasAnteriores.push(musica);
        musicasFilaDeReproducao = musicasPosteriores.concat(musicasAnteriores);
    }
}

btnPesquisarArtistas.addEventListener('click', () => {
    let pesquisa = inputPesquisarArtistas.value;
    getArtistas(pesquisa);
});

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

