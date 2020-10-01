<?php 
    include '../models/Album.model.php';

    $idPlaylist = $_GET['idPlaylist'];
    require_once('./sql.php');
    $sql = new Sql();

    $sql->query('DELETE FROM musica_playlist
    WHERE id_playlist = :idPlaylist', [':idPlaylist'],[$idPlaylist]);

    $sql->query('DELETE FROM playlists
    WHERE id_playlist = :idPlaylist', [':idPlaylist'],[$idPlaylist]);