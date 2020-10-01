<?php 
    include '../models/Playlist.model.php';
    $idUsuario = $_GET['idUsuario'];

    require_once('./sql.php');
    $sql = new Sql();
    $playlists = $sql->query('SELECT *
    FROM playlists as p 
    WHERE id_usuario = :idUsuario',
    ['idUsuario'], [$idUsuario]);

    $playlistsJson = [];

    foreach ($playlists as $playlist) {
        $playlistJson = new Playlist();

        $playlistJson->id = $playlist->id_playlist;
        $playlistJson->titulo = $playlist->titulo_playlist;
        $playlistJson->quantidadeMusicas = $playlist->quantidade_musicas;
        $playlistJson->capa = $playlist->capa_playlist;
        
        array_push($playlistsJson, $playlistJson);
    }

    echo json_encode($playlistsJson , JSON_PRETTY_PRINT);

