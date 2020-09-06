<?php 
    $idArtista = $_GET['idArtista'];
    // echo $idAlbum;

    require_once('./sql.php');
    $sql = new Sql();
    $albuns = $sql->query('SELECT *
    FROM albuns as alb 
    INNER JOIN artistas as art
    ON alb.id_artista = art.id_artista
    WHERE alb.id_artista=:idArtista;', 
    [':idArtista'], [$idArtista]);

    // $albunsJson = [];
    // foreach($albuns as $album) {
    //     array_push($albunsJson, $album);
    // }

    echo json_encode($albuns, JSON_PRETTY_PRINT);
?>