<?php 
  $idAlbum = $_GET['idAlbum'];
  require_once('./sql.php');
  $sql = new Sql();

  $sql->query('DELETE FROM albuns
  WHERE id_album = :idAlbum', [':idAlbum'],[$idAlbum]);
