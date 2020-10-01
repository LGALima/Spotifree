let htmlPaginaMusicasLike = document.getElementById('tela-musicas-favoritas');
let htmlMusicasLike = document.getElementById('musicas-favoritas');

function getMusicasLike(idUsuario) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            response = JSON.parse(xhttp.responseText);
        }
    };
    xhttp.open("GET", url + "getMusicasLike.php?idUsuario=" + idUsuario, false);
    xhttp.send();
    return response;
}

function gerarMusicasLike() {
    htmlMusicasLike.innerHTML = '';
    let divColBody = document.createElement('div');
    divColBody.classList.add('col-12', 'album-body', 'mt-5');
    htmlMusicasLike.appendChild(divColBody);

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

    let musicasLike = getMusicasLike(idUsuario);

    // caso nao tenha nenhum elemento exibe um mensagem
    if (musicasLike.length === 0) {
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
    console.log(musicasLike);
    musicasLike.forEach((musica, index) => {
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
            musicasRecebidas = musicasLike;
            selecionarMusica(musicasRecebidas.indexOf(musica));
        });


        let tdLike = document.createElement('td');
        trBodyAlbuns.appendChild(tdLike);

        let iconeLike = document.createElement('i');
        iconeLike.classList.add((musica.idLike == -1 ? 'far' : 'fas'), 'fa-fw', 'fa-heart');
        tdLike.appendChild(iconeLike);

        iconeLike.addEventListener('click', () => {
            deleteCreateMusicaLike(musica);
            gerarMusicasLike();
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
}