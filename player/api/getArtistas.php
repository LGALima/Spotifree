<?php 
    require_once('./sql.php');
    $sql = new Sql();
    $artistas = $sql->query('SELECT *
    FROM artistas',
    [], []);

    // $artistasJson = [];
    // foreach($artistas as $artista) {
    //     array_push($artistasJson, $artista);
    // }

    echo json_encode($artistas, JSON_PRETTY_PRINT);
?>