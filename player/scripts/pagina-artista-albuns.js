
// Buscar musicas por album
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

function adicionarMusicaPlaylist(idMusica, idPlaylist) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert('Musica inserida com sucesso!');
        }
    };
    xhttp.open("GET", url + "adicionarMusicaPlaylist.php?idMusica=" + idMusica + "&idPlaylist=" + idPlaylist, false);
    xhttp.send();
    // return response;
}

function deleteCreateMusicaLike(musica) {
    let xhttp = new XMLHttpRequest();
    let response;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            response = xhttp.responseText;
        }
    };
    xhttp.open("GET", url + 'deleteCreateMusicaLike.php?idLike=' + musica.idLike + '&idMusica=' + musica.id + '&idUsuario=' + idUsuario, false);
    xhttp.send();
    console.log(response);
    return response;
}

// Buscar albuns por artista
function getAlbunsPorArtista(artistaAtual) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            gerarAlbuns(JSON.parse(xhttp.responseText), artistaAtual);
            htmlTelaPaginaArtista.scrollIntoView();
        }
    };
    xhttp.open("GET", url + "getAlbunsPorArtista.php?idArtista=" + artistaAtual.id, false);
    xhttp.send();
}

function getPlaylistsPorUsuarioSomenteIdTitulo(idUsuario) {
    let xhttp = new XMLHttpRequest();
    let response;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            response = JSON.parse(xhttp.responseText);
        }
    };
    xhttp.open("GET", url + "getPlaylistsPorUsuarioSomenteIdTitulo.php?idUsuario=" + idUsuario, false);
    xhttp.send();
    return response;
}

// Gera cada album com suas respectivas musicas
function gerarAlbuns(albunsRecebidos, artistaAtual) {
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

        let thOptionsFilaAlbuns = document.createElement('th');
        thOptionsFilaAlbuns.classList.add('album-tabela-indice');
        thOptionsFilaAlbuns.innerText = '';
        trHeaderAlbuns.appendChild(thOptionsFilaAlbuns);
        
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
            if(album.musicas.length !== 0) {
                musicasRecebidas = album.musicas;
                selecionarMusica();
            } else {
                alert('Este album não possui musicas!');
            }
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

            let tdOptions = document.createElement('td');
            trBodyAlbuns.appendChild(tdOptions);
            
            let iconeOptions = document.createElement('i');
            iconeOptions.classList.add('fa', 'fa-fw', 'fa-dot-circle');
            iconeOptions.title = "Adicionar a playlist";
            tdOptions.appendChild(iconeOptions);

            iconeOptions.addEventListener('click', () => {
                let telaTransparente = document.createElement('div');
                telaTransparente.classList.add('adicionar-playlist-tela-transparente');
                document.body.appendChild(telaTransparente);

                let dropdownPlaylists = document.createElement('div');
                dropdownPlaylists.classList.add('adicionar-playlist-dropdown');
                tdOptions.appendChild(dropdownPlaylists);

                telaTransparente.addEventListener('click', () => {
                    document.body.removeChild(telaTransparente);
                    tdOptions.removeChild(dropdownPlaylists);
                });

                let playlists = getPlaylistsPorUsuarioSomenteIdTitulo(idUsuario);

                playlists.forEach(playlist => {
                    let playlistItem = document.createElement('div');
                    playlistItem.innerText = playlist.titulo;
                    playlistItem.classList.add('adicionar-playlist-item');
                    dropdownPlaylists.appendChild(playlistItem);

                    playlistItem.addEventListener('click', () => {
                        adicionarMusicaPlaylist(musica.id, playlist.id);
                        telaTransparente.click();
                    });

                });
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
    });
}
