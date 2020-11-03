<?php
session_start();

if (!isset($_SESSION['idUsuario'])) {
    header("location:../login/index.html");
} else {
    $idUsuario = $_SESSION['idUsuario'];
    $nome = $_SESSION['nome'];
    $genero = $_SESSION['genero'];
    $email = $_SESSION['email'];
    $premium = $_SESSION['premium'];
    $foto = $_SESSION['foto'];
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <script type="text/javascript">

        var idUsuario = '<?php echo $idUsuario ?>';
        var fotoUsuarioSessao = '<?php echo $foto ?>';
        var usuarioSessao = {};
        function atualizarDadosUsuarioSessao() {
            usuarioSessao.nome = '<?php echo $nome?>';
            usuarioSessao.genero = '<?php echo $genero?>';
            usuarioSessao.email = '<?php echo $email?>';
            usuarioSessao.premium = '<?php echo $premium?>';
            usuarioSessao.foto = '<?php echo $foto ?>';
        }
        atualizarDadosUsuarioSessao();  
    </script>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Spotifree - Web Player</title>
    <link rel="shortcut icon" href="../img/icon-free.ico">
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
        <!-- <div class="menu-item menu-cor mb-2" id="menu-perfil"><i class="fas fa-fw fa-user mr-2"></i>Perfil</div> -->
        <div class="menu-item menu-cor mb-2" id="menu-artistas"><i class="fas fa-fw fa-microphone-alt mr-2"></i>Artistas</div>
        <div class="menu-item menu-cor mb-2" id="menu-musicas-favoritas"><i class="fas fa-fw fa-heart mr-2"></i>Musicas favoritas</div>
        <div class="menu-item menu-cor mb-2" id="menu-playlist"><i class="fas fa-fw fa-music mr-2"></i>Playlists</div>
        <div class="menu-nova-playlist menu-cor" id="menu-nova-playlist"><i class="far fa-fw fa-plus-square"></i> Nova playlist</div>
    </div>

    <div class="navbar-perfil text-right">
        <div class="dropdown-perfil">
            <span class="dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <img id="foto-perfil-header" style="width: 25px; height: 25px; border-radius: 100%;">
                <?php echo $nome ?>
            </span>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" id="menu-perfil">Perfil</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">Log out</a>
            </div>
        </div>
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
                    <div class="col-4 div-img">
                        <img id="foto-perfil" style="width: 200px; height: 200px">
                    </div>
                    <div class="col-8 text-left">
                        <div class="row">
                            <div class="col-6 mt-4">
                                <span class="info-perfil">Nome do usuário</span>
                            </div>
                            <div class="col-6 mt-4">
                                <span><?php echo $nome ?></span>
                            </div>
                            <div class="col-12">
                                <hr>
                            </div>
                            <div class="col-6 mt-2">
                                <span class="info-perfil">Email</span>
                            </div>
                            <div class="col-6 mt-2">
                                <span><?php echo $email ?></span>
                            </div>
                            <div class="col-12">
                                <hr>
                            </div>
                            <div class="col-6 mt-2">
                                <span class="info-perfil">Seu plano</span>
                            </div>
                            <div class="col-6 mt-2">
                                <span><?php echo ($premium == "S" ? "Premium" : "Free") ?></span>
                                <button <?php echo ($premium == "S" ? "hidden" : "") ?> class="btn-sm btn-plano"
                                 id="btn-trocar-plano">Alterar plano</button>
                            </div>
                        </div>
                        <div class="col-12 text-right">
                            <button type="button" class="btn-editar" id="btn-editar-perfil">Editar perfil</button>
                        </div>
                        <div class="col-12 text-right">
                            <a href="#" class="btn-remover" id="btn-remover-perfil">Remover perfil</a>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <div id="tela-perfil-editar" class="tela text-white">
            <div class="container-fluid">
                <div class="row fundo-header">
                    <div class="col-12 artistas-titulo-artista">
                        Editar perfil
                    </div>
                </div>
            </div>
        <div class="container mt-3">
                <div class="row">
                    <div class="col-4 div-img">
                        <img id="foto-perfil-editar" style="width: 200px; height: 200px">
                        <input type='file' hidden id="foto-perfil-editar-input" onchange="carregarFotoPerfil(this);" />
                    </div>
                    <div class="col-8 text-left">
                        <div class="row">
                            <div class="col-6 mt-4">
                                <span class="info-perfil">Nome do usuário</span>
                            </div>
                            <div class="col-6 mt-4">
                                <input type="text" id="input-editar-perfil-nome">
                            </div>
                            <div class="col-12">
                                <hr>
                            </div>
                            <div class="col-6 mt-2">
                                <span class="info-perfil">Email</span>
                            </div>
                            <div class="col-6 mt-2">
                                <input type="email" id="input-editar-perfil-email">
                            </div>
                            <div class="col-12">
                                <hr>
                            </div>
                            <div class="col-6 mt-2">
                                <span class="info-perfil">Seu plano</span>
                            </div>
                            <div class="col-6 mt-2">
                                <span><?php echo ($premium == "S" ? "Premium" : "Free") ?></span>
                            </div>
                        </div>
                        <div class="col-12 text-right">
                            <button type="button" class="btn-editar" id="btn-salvar-perfil">Salvar perfil</button>
                        </div>
                        <div class="col-12 text-right">
                            <a href="#" class="btn-voltar">Voltar</a>
                        </div>
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