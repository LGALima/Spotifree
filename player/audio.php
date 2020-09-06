<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
    <link rel="stylesheet" href="audio.css">
    <script src="https://kit.fontawesome.com/1923c790bd.js" crossorigin="anonymous"></script>
</head>

<body>
    <!-- ARTISTAS -->
    <div id="tela-artistas" class="tela text-white">
        <div id="artistas"></div>
    </div>
    <div id="tela-albuns" class="tela text-white">
        <a href="#tela-artistas">Voltar</a>
        <div id="albuns">Nenhum album selecionado</div>
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
            <i class="fa fa-fw fa-play icon-circle"  id="player-play" onclick="playMusica();"></i>
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

    <script src="audio.js"></script>
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV" crossorigin="anonymous"></script>
</body>

</html>