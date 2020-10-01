// Buscar artistas
function getArtistas(pesquisa) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            gerarArtistas(JSON.parse(xhttp.responseText));
            htmlTelaArtistas.scrollIntoView();
        }
    };
    xhttp.open("GET", url + "getArtistas.php?pesquisa=" + (pesquisa ? pesquisa : ''), false);
    xhttp.send();
}

function gerarArtistas(artistasRecebidos) {
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