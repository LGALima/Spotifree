<?php
session_start();
$_SESSION['idUsuario'] = 1;
$_SESSION['nome'] = 'Lucas';

if (!isset($_SESSION['idUsuario'])) {
    header("location:../cadastro/index.html");
} else {
    $idUsuario = $_SESSION['idUsuario'];
    // Pegar foto e demais informações
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <script type="text/javascript">
        var idUsuario = '<?php echo $idUsuario ?>';
    </script>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
    <link rel="stylesheet" href="../styleGeral.css">
    <link rel="stylesheet" href="audio.css">
    <script src="https://kit.fontawesome.com/1923c790bd.js" crossorigin="anonymous"></script>
</head>

<body>

    <div class="menu">
        <div class="menu-item menu-cor mb-4" id="menu-inicio"><i class="fa fa-fw fa-home mr-2"></i>Inicio</div>
        <div class="menu-para-voce mb-1">Para você</div>
        <div class="menu-item menu-cor mb-2" id="menu-perfil"><i class="fas fa-fw fa-user mr-2"></i>Perfil</div>
        <div class="menu-item menu-cor mb-2" id="menu-artistas"><i class="fas fa-fw fa-microphone-alt mr-2"></i>Artistas</div>
        <div class="menu-item menu-cor mb-2" id="menu-musicas-favoritas"><i class="fas fa-fw fa-heart mr-2"></i>Musicas favoritas</div>
        <div class="menu-item menu-cor mb-2" id="menu-playlist"><i class="fas fa-fw fa-music mr-2"></i>Playlists</div>
        <div class="menu-nova-playlist menu-cor" id="menu-nova-playlist"><i class="far fa-fw fa-plus-square"></i> Nova playlist</div>
    </div>

    <div class="navbar-perfil text-right">
        <img src="data:image/jpeg;base64,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" style="width: 25px; height: 25px; border-radius: 100%;">
        <span>Nome do Usuario</span>
    </div>

    <div class="conteudo">
        <!-- Perfil -->
        <div id="tela-perfil" class="tela text-white">
            <div class="container-fluid">
                <div class="row fundo-header">
                    <div class="col-12 artistas-titulo-artista">
                        Perfil
                    </div>
                </div>
            </div>
            <div class="container mt-3">
                <div class="row">
                    <div class="col-12">
                        <img id="foto-perfil" style="width: 200px; height: 200px; border-radius: 100%">
                        <input type='file' hidden id="foto-perfil-input" onchange="carregarFotoPerfil(this);" />
                    </div>

                    <div class="col-4 mt-2">
                        Nome:
                        <input class="form-control">
                    </div>
                    <div class="col-4 mt-2">
                        Email:
                        <input class="form-control">
                    </div>
                    <div class="col-12 mt-2">
                        <div class="btn btn-secondary">Enviar</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Pagina Artistas -->
        <div id="tela-artistas" class="tela text-white">
            <div class="container-fluid">
                <div class="row fundo-header">
                    <div class="col-12 artistas-titulo-artista">
                        Artistas
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 artistas-filtros-pesquisa">
                        <i id="btn-pesquisar-artistas" class="fa fa-search"></i>
                        <input type="text" id="input-pesquisar-artistas" placeholder="Filtrar">
                    </div>
                </div>
                <div id="artistas" class="row"></div>
            </div>
        </div>

        <!-- Página do artista -->
        <div id="tela-pagina-artista" class="tela text-white">
            <div class="container-fluid">
                <div class="row fundo-header">
                    <div class="col-12 artista-nome-titulo" id="nome-artista">Artista não selecionado</div>
                </div>
                <div id="albuns" class="row album">

                </div>
            </div>
        </div>

        <!-- Musicas Favoritadas -->
        <div id="tela-musicas-favoritas" class="tela text-white">
            <div class="container-fluid">
                <div class="row fundo-header">
                    <div class="col-12 artista-nome-titulo">Musicas favoritas</div>
                </div>
                <div id="musicas-favoritas" class="row">

                </div>
            </div>
        </div>

        <!-- Playslists -->
        <div id="tela-minhas-playlists" class="tela text-white">
            <div class="container-fluid">
                <div class="row fundo-header">
                    <div class="col-12 artista-nome-titulo">Minhas playlists</div>
                </div>
                <div id="playlists" class="row">

                </div>
            </div>
        </div>

        <div id="tela-playlist-selecionada" class="tela text-white">
            <div class="container-fluid">
                <div class="row fundo-header">
                    <div class="col-12 playlist-selecionada-header">
                        <div class="playlist-selecionada-imagem-header">
                            <img id="img-playlist-selecionada" alt="">
                        </div>
                        <div class="playlist-selecionada-titulo">
                            <div id="titulo-playlist-selecionada" class="playlist-selecionada-titulo-nome">Playlist não selecionada</div>
                        </div>
                    </div>
                </div>
                <div id="playlists-selecionada" class="row">

                </div>
            </div>
        </div>

        <div class="tela-transparente-overlay" id="criar-playlist-overlay" hidden>
            <div class="criar-playlist-overlay">
                <div class="text-right">
                    <i style="cursor: pointer;" class="fa fa-times fa-fw" id="btn-sair-nova-playlist"></i>
                </div>
                <div class="criar-playlist-imagem">
                    <img id="criar-playlist-img">
                    <input type='file' hidden id="criar-playlist-input-capa" onchange="carregarCapaPlaylist(this);" />
                </div>
                <div class="criar-playlist-form">
                    <span>Titulo</span><br>
                    <input name="titulo-playlist" type="text" id="criar-playlist-titulo">
                    <div style="margin-top: 105px; padding-right: 30px" class="text-right">
                        <button class="btn btn-secondary" id="btn-criar-nova-playlist">Enviar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- PLAYER -->
    <audio id="musica" hidden controls type="audio/mp3">
    </audio>
    <div id="player" class="player">
        <div class="info-musica">
            <img id="capa-album">
            <div id="descricao-musica"></div>
        </div>
        <div class="controles">
            <i class="fa fa-fw fa-fast-backward icon-circle" onclick="trocarMusica(false)"></i>
            <i class="fa fa-fw fa-play icon-circle" id="player-play" onclick="playMusica();"></i>
            <i class="fa fa-fw fa-pause icon-circle" id="player-pause" hidden="true" onclick="pausarMusica();"></i>
            <i class="fa fa-fw fa-fast-forward icon-circle" onclick="trocarMusica(true)"></i>
            <i class="fa fa-fw fa-redo-alt icon-circle" onclick="musica.currentTime = 0;"></i>
            <div class="tempo">
                <div id="tempo-tocado" class="tempo-musica"></div>
                <div id="tempo-barra-musica" class="tempo-barra-musica">
                    <div id="tempo-barra-tocado" class="tempo-barra-tocado"></div>
                </div>
                <div id="tempo-total" class="tempo-musica"></div>
            </div>
        </div>
    </div>
    <!-- PLAYER -->

    <script src="./scripts/player.js"></script>
    <script src="./scripts/pagina-artistas.js"></script>
    <script src="./scripts/pagina-artista-albuns.js"></script>
    <script src="./scripts/pagina-playlists.js"></script>
    <script src="./scripts/pagina-musicas-favoritas.js"></script>
    <script src="audio.js"></script>
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV" crossorigin="anonymous"></script>
</body>

</html>