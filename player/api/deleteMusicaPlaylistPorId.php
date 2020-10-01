<?php 
    include '../models/Album.model.php';

    $idMusicaPlaylist = $_GET['idMusicaPlaylist'];
    require_once('./sql.php');
    $sql = new Sql();
    $sql->query('DELETE FROM musica_playlist
    WHERE id_musica_playlist = :idMusicaPlaylist',[':idMusicaPlaylist'],[$idMusicaPlaylist]);