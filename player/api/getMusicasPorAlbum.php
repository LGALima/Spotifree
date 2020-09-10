<?php 
    include '../models/Musica.model.php';
    $idAlbum = $_GET['idAlbum'];

    require_once('./sql.php');
    $sql = new Sql();
    $musicas = $sql->query('SELECT DISTINCT *
    FROM musicas as m 
    INNER JOIN albuns as alb 
    ON m.id_album = alb.id_album
    INNER JOIN artistas as art
    ON alb.id_artista = art.id_artista
    WHERE m.id_album=:idAlbum;', 
    [':idAlbum'], [$idAlbum]);

    $musicasJson = [];
    foreach($musicas as $musica) {
        $musicaJson = new Musica();
        $musicaJson->id = $musica->id_musica;
        $musicaJson->titulo = $musica->titulo_musica;
        $musicaJson->musica = $musica->musica;
        $musicaJson->album->id = $musica->id_album;
        $musicaJson->album->titulo = $musica->titulo_album;
        $musicaJson->album->lancamento = $musica->ano_lancamento;
        $musicaJson->album->capa = $musica->capa;
        $musicaJson->album->artista->id = $musica->id_artista;
        $musicaJson->album->artista->ouvintes = $musica->total_ouvintes;
        $musicaJson->album->artista->artista = $musica->artista;
        $musicaJson->album->artista->imagemArtista = $musica->imagem_artista;

        array_push($musicasJson, $musicaJson);
    }

    echo json_encode($musicasJson, JSON_PRETTY_PRINT);
?>