<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="audio.css">
</head>

<body>
    <audio id="musica" hidden controls type="audio/mp3">
    </audio>
    <div id="player" class="player">
        <div class="capa">
            <img id="capa-album">
            <div id="descricao-musica"></div>
        </div>
        <div class="controles">
            <div class="tempo">
                <div id="tempo-tocado" class="tempo-musica"></div>
                <div id="tempo-barra-musica" class="tempo-barra-musica">
                    <div id="tempo-barra-tocado" class="tempo-barra-tocado"></div>
                </div>
                <div id="tempo-total" class="tempo-musica"></div>
            </div> 
            <button onclick="trocarMusica(false)"> &#8656; </button>
            <button id="player-play" onclick="playMusica();">&#9654;</button>
            <button id="player-pause" style="display: none;" onclick="pausarMusica();">&#9707;</button>
            <button onclick="trocarMusica(true)"> &#8658;</button>
            <button onclick="musica.volume += 0.2">+</button>
            <button onclick="musica.volume -= 0.2">-</button>
            <button onclick="musica.currentTime = 0;">	&#8634;</button>
        </div>
    </div>

    <script src="audio.js"></script>
</body>

</html>