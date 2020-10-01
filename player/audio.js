const url = 'http://localhost/Spotifree/player/api/';

let htmlTelaArtistas = document.getElementById('tela-artistas');
let htmlArtistas = document.getElementById('artistas');
let htmlTelaPaginaArtista = document.getElementById('tela-pagina-artista');
let htmlAlbuns = document.getElementById('albuns');
let htmlTelaMusicas = document.getElementById('tela-musicas');
let htmlMusicas = document.getElementById('musicas');
let htmlTelaMinhasPlaylist = document.getElementById('tela-minhas-playlists');
let hmtlPlaylists = document.getElementById('playlists');
let htmlTelaPlaylistSelecionada = document.getElementById('tela-playlist-selecionada');
let htmlPlaylistSelecionada = document.getElementById('playlists-selecionada');
let htmlTelaMusicasFavoritas = document.getElementById('tela-musicas-favoritas');

let htmlMenuInicio = document.getElementById('menu-inicio');
let htmlMenuMusicasFavoritas = document.getElementById('menu-musicas-favoritas');
let htmlMenuPlaylist = document.getElementById('menu-playlist');
let htmlMenuArtistas = document.getElementById('menu-artistas');
let htmlMenuNovaPlaylist = document.getElementById('menu-nova-playlist');
let htmlMenuPerfil = document.getElementById('menu-perfil');

let htmlCriarPlaylist = document.getElementById('criar-playlist-overlay');

let inputPesquisarArtistas = document.getElementById('input-pesquisar-artistas');
let btnPesquisarArtistas = document.getElementById('btn-pesquisar-artistas')

let criarPlaylistInputCapa = document.getElementById('criar-playlist-input-capa');
let criarPlaylistCapa = document.getElementById('criar-playlist-img');

function formatarNumeroComPonto(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, "\.");
}

function selecionarMenu(elemento) {
    htmlMenuMusicasFavoritas.classList.remove('menu-selecionado');
    htmlMenuPlaylist.classList.remove('menu-selecionado');
    htmlMenuArtistas.classList.remove('menu-selecionado');
    htmlMenuNovaPlaylist.classList.remove('menu-selecionado');
    htmlMenuPerfil.classList.remove('menu-selecionado');
    htmlMenuInicio.classList.remove('menu-selecionado');

    elemento.classList.add('menu-selecionado');
}

htmlMenuArtistas.addEventListener('click', () => {
    getArtistas();
    selecionarMenu(htmlMenuArtistas);
});

btnPesquisarArtistas.addEventListener('click', () => {
    let pesquisa = inputPesquisarArtistas.value;
    getArtistas(pesquisa);
});


htmlMenuPlaylist.addEventListener('click', () => {
    selecionarMenu(htmlMenuPlaylist);
    getPlaylistsPorUsuario(idUsuario);
    htmlTelaMinhasPlaylist.scrollIntoView();
});

htmlMenuMusicasFavoritas.addEventListener('click', () => {
    gerarMusicasLike();
    selecionarMenu(htmlMenuMusicasFavoritas);
    htmlTelaMusicasFavoritas.scrollIntoView();
});

htmlMenuNovaPlaylist.addEventListener('click', () => {
    htmlCriarPlaylist.hidden = false;
    criarPlaylistCapa.removeAttribute('src');
    document.getElementById('criar-playlist-titulo').value = '';
});

htmlMenuPerfil.addEventListener('click', () => {
    selecionarMenu(htmlMenuPerfil);
});

htmlMenuInicio.addEventListener('click', () => {
    selecionarMenu(htmlMenuInicio);
})

document.getElementById('btn-criar-nova-playlist').addEventListener('click', () => {
    let img = (criarPlaylistCapa.src).split(',')[1];
    let descricao = document.getElementById('criar-playlist-titulo').value;
    postNovaPlaylist(idUsuario, img, descricao);
});

document.getElementById('btn-sair-nova-playlist').addEventListener('click', () => {
    htmlCriarPlaylist.hidden = true;
});

// Criar nova playlist
function carregarCapaPlaylist(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        
        reader.onload = function (e) {
            criarPlaylistCapa.src = e.target.result
            console.log(criarPlaylistCapa.src);
        };
        reader.readAsDataURL(input.files[0]);
    }
}

criarPlaylistCapa.addEventListener('click', () => {
    criarPlaylistInputCapa.click();
});


function postNovaPlaylist(idUsuario, img, descricao) {
    console.log(img);
    if (!img || !descricao) {
        alert('Para criar uma playlist, você deve inserir a descrição e a imagem!');
        return;
    }
    
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert('Playlist criada com sucesso!');
            htmlCriarPlaylist.hidden = true;
        }
    }
    let urlPost = url + "postNovaPlaylist";
    let parametros = { // Criar json com os dados e o base64
        'idUsuario': idUsuario,
        'titulo': descricao,
        'imagemBase64': img
    };
    
    xhttp.open("POST", urlPost);
    xhttp.setRequestHeader('Content-type', 'application/json'); // Para enviar imagem e musicas vai ser assim
    xhttp.send(JSON.stringify(parametros));
}

htmlMenuArtistas.click();