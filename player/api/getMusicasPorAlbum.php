<?php 
    $idAlbum = $_GET['idAlbum'];
    // echo $idAlbum;

    require_once('./sql.php');
    $sql = new Sql();
    $musicas = $sql->query('SELECT *
    FROM musicas as m 
    INNER JOIN albuns as alb 
    ON m.id_album = alb.id_album
    INNER JOIN artistas as art
    ON alb.id_artista = art.id_artista
    WHERE m.id_album=:idAlbum;', 
    [':idAlbum'], [$idAlbum]);

    $musicasJson = [];
    foreach($musicas as $musica) {
        array_push($musicasJson, $musica);
    }

    echo json_encode($musicasJson, JSON_PRETTY_PRINT);
?>