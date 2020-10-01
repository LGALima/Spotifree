<?php

include '../models/Musica.model.php';

$idMusica = $_GET['idMusica'];
$idPlaylist = $_GET['idPlaylist'];

require_once('./sql.php');
$sql = new Sql();
$musicasLike = $sql->query(
    'INSERT INTO musica_playlist (id_musica, id_playlist) 
    VALUES (:idMusica, :idPlaylist)',
    [':idMusica', ':idPlaylist'],
    [$idMusica, $idPlaylist]
);
