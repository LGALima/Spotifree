let tituloPlaylistSelecionada = document.getElementById('titulo-playlist-selecionada');
let imgPlaylistSelecionada = document.getElementById('img-playlist-selecionada');

let tocarTodasMusicasPlaylist;
imgPlaylistSelecionada.addEventListener('click', tocarTodasMusicasPlaylist);

function getPlaylistsPorUsuario(idUsuario) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let playlists = JSON.parse(xhttp.responseText);
            gerarPlaylists(playlists)
            htmlTelaMinhasPlaylist.scrollIntoView();
        }
    }
    xhttp.open("GET", url + "getPlaylistsPorUsuario?idUsuario=" + idUsuario);
    xhttp.send();
}

function getMusicasPorPlaylist(playlist) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let musicas = JSON.parse(xhttp.responseText);
            gerarPlaylist(musicas, playlist);
            htmlTelaPlaylistSelecionada.scrollIntoView();
        }
    }
    xhttp.open("GET", url + "getMusicasPorPlaylist?idPlaylist=" + playlist.id + "&idUsuario=" + idUsuario);
    xhttp.send();
}

function deleteMusicaPlaylistPorId(idMusicaPlaylist, playlist) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert('Musica removida com sucesso!');
            getMusicasPorPlaylist(playlist);
        }
    }
    xhttp.open("GET", url + "deleteMusicaPlaylistPorId.php?idMusicaPlaylist=" + idMusicaPlaylist, false);
    xhttp.send();
}

function deletePlaylist(playlist) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert('Playlist removida com sucesso!');
            htmlMenuPlaylist.click();
        }
    }
    xhttp.open("GET", url + "deletePlaylist.php?idPlaylist=" + playlist.id);
    xhttp.send();
}

function gerarPlaylists(playlists) {
    hmtlPlaylists.innerHTML = '';
    playlists.forEach(playlist => {
        let htmlCardPlaylist = document.createElement('div');
        htmlCardPlaylist.classList.add('pt-4', 'col-xl-3', 'col-lg-4', 'col-md-4', 'col-sm-6', 'col-12', 'text-center');
        hmtlPlaylists.appendChild(htmlCardPlaylist);

        let htmlImgPlaylist = document.createElement('img');
        htmlImgPlaylist.classList.add('rounded-circle', 'artistas-foto-artista');
        htmlImgPlaylist.src = 'data:image/jpeg;base64,' + playlist.capa;
        htmlImgPlaylist.addEventListener('click', () => {
            getMusicasPorPlaylist(playlist);
        });
        htmlCardPlaylist.appendChild(htmlImgPlaylist);

        let htmlNomePlaylist = document.createElement('div');
        htmlNomePlaylist.classList.add('mt-3', 'artistas-nome-artista');
        htmlNomePlaylist.addEventListener('click', () => {
            getMusicasPorPlaylist(playlist);
        });
        htmlNomePlaylist.innerText = playlist.titulo;
        htmlCardPlaylist.appendChild(htmlNomePlaylist);
    });
}

function gerarPlaylist(musicasPlaylist, playlist) {
    htmlPlaylistSelecionada.innerHTML = '';
    tituloPlaylistSelecionada.innerText = playlist.titulo;
    imgPlaylistSelecionada.src = 'data:image/png;base64,' + playlist.capa;

    let divExcluirPlaylist = document.createElement('div');
    divExcluirPlaylist.classList.add('col-12', 'mt-2', 'text-right');
    htmlPlaylistSelecionada.appendChild(divExcluirPlaylist);

    let spanExcluirPlaylist = document.createElement('span');
    divExcluirPlaylist.appendChild(spanExcluirPlaylist);

    let iconeExcluir = document.createElement('i');
    iconeExcluir.classList.add('fa', 'fa-fw', 'fa-trash');
    spanExcluirPlaylist.appendChild(iconeExcluir);
    spanExcluirPlaylist.innerHTML += 'Excluir Playlist';    

    spanExcluirPlaylist.addEventListener('click', () => {
        deletePlaylist(playlist);
        htmlMenuPlaylist.click();
    });

    let divColBody = document.createElement('div');
    divColBody.classList.add('col-12', 'album-body', 'mt-2');
    htmlPlaylistSelecionada.appendChild(divColBody);

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

    let thRemoverDaPlaylist = document.createElement('th');
    thRemoverDaPlaylist.classList.add('album-tabela-indice');
    thRemoverDaPlaylist.innerText = '';
    trHeaderAlbuns.appendChild(thRemoverDaPlaylist);

    let thAddFilaAlbuns = document.createElement('th');
    thAddFilaAlbuns.classList.add('album-tabela-indice');
    thAddFilaAlbuns.innerText = '';
    trHeaderAlbuns.appendChild(thAddFilaAlbuns);

    let thTempoAlbuns = document.createElement('th');
    thTempoAlbuns.classList.add('album-tabela-tempo');
    thTempoAlbuns.innerText = 'Tempo';
    trHeaderAlbuns.appendChild(thTempoAlbuns);

    imgPlaylistSelecionada.removeEventListener('click', tocarTodasMusicasPlaylist);
    tocarTodasMusicasPlaylist = function () {
        if (musicasPlaylist.length !== 0) {
            musicasRecebidas = musicasPlaylist;
            selecionarMusica();
        } else {
            alert('Esta playlist não possui musicas!');
        }
    }
    imgPlaylistSelecionada.addEventListener('click', tocarTodasMusicasPlaylist);


    // caso nao tenha nenhum elemento exibe um mensagem
    if (musicasPlaylist.length === 0) {
        let trBodyAlbuns = document.createElement('tr');
        tableAlbuns.appendChild(trBodyAlbuns);

        let tdInfo = document.createElement('td');
        tdInfo.colSpan = 6;
        tdInfo.classList.add('text-center');
        tdInfo.innerText = 'Sem musicas nesta playlist';
        trBodyAlbuns.appendChild(tdInfo);
        return;
    }
    // Itera as musicas recem recebida para montar as rows de musica
    console.log(musicasPlaylist);
    musicasPlaylist.forEach((musica, index) => {
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
            musicasRecebidas = musicasPlaylist;
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

        let tdRemoverDaPlaylist = document.createElement('td');
        trBodyAlbuns.appendChild(tdRemoverDaPlaylist);
        
        let iconeRemoverDaPlaylist = document.createElement('i');
        iconeRemoverDaPlaylist.classList.add('fa', 'fa-fw', 'fa-minus');
        iconeRemoverDaPlaylist.title = "Remover da playlist";
        tdRemoverDaPlaylist.appendChild(iconeRemoverDaPlaylist);

        iconeRemoverDaPlaylist.addEventListener('click', () => {
            deleteMusicaPlaylistPorId(musica.idMusicaPlaylist, playlist);
        });
        
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
}