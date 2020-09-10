<?php 
    include '../models/Album.model.php';

    $idArtista = $_GET['idArtista'];
    require_once('./sql.php');
    $sql = new Sql();
    $albuns = $sql->query('SELECT DISTINCT *
    FROM albuns as alb 
    INNER JOIN artistas as art
    ON alb.id_artista = art.id_artista
    WHERE alb.id_artista=:idArtista;', 
    [':idArtista'], [$idArtista]);

    $albunsJson = [];

    foreach($albuns as $album) {
        $albumJson = new Album();
        $albumJson->id = $album->id_album;
        $albumJson->titulo = $album->titulo_album;
        $albumJson->lancamento = $album->ano_lancamento;
        $albumJson->capa = $album->capa;
        $albumJson->artista->id = $album->id_artista;
        $albumJson->artista->ouvintes = $album->total_ouvintes;
        $albumJson->artista->artista = $album->artista;
        $albumJson->artista->imagemArtista = $album->imagem_artista;

        array_push($albunsJson, $albumJson);
    }

    echo json_encode($albunsJson, JSON_PRETTY_PRINT);
?>