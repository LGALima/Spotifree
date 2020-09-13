<?php 
    include '../models/Artista.model.php';
    require_once('./sql.php');
    $idLike = (int) $_GET['idLike'];
    $idMusica = $_GET['idMusica'];
    $idUsuario = $_GET['idUsuario'];
    $sql = new Sql();
    $query;
    if($idLike === -1) {
        $query = 'INSERT INTO musicas_like (id_musica, id_usuario) VALUES (:idMusica, :idUsuario)';
        $sql->query($query,
        [':idMusica', 'idUsuario'], [$idMusica, $idUsuario]);
        echo 'insert';
    } else {
        $query = 'DELETE FROM musicas_like WHERE id_like = :idLike';
        $sql->query($query,
        [':idLike'], [$idLike]);
        echo 'delete';
    }
?>