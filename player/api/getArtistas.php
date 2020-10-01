<?php
include '../models/Artista.model.php';

$pesquisa = $_GET['pesquisa'];

require_once('./sql.php');
$sql = new Sql();
if ((bool) $pesquisa) {
    $artistas = $sql->query(
        "SELECT * FROM artistas WHERE artista LIKE :pesquisa ORDER BY artista",
        [':pesquisa'],
        ["%" . $pesquisa . "%"]
    );
} else {
    $artistas = $sql->query(
        'SELECT * FROM artistas  ORDER BY artista',
        [],
        []
    );
}

$artistasJson = [];
foreach ($artistas as $artista) {
    $artistaJson = new Artista();
    $artistaJson->id = $artista->id_artista;
    $artistaJson->artista = $artista->artista;
    $artistaJson->ouvintes = $artista->total_ouvintes;
    $artistaJson->imagemArtista = $artista->imagem_artista;
    array_push($artistasJson, $artistaJson);
}

echo json_encode($artistasJson, JSON_PRETTY_PRINT);
