<?php 
  $idArtista = $_GET['idArtista'];
  require_once('./sql.php');
  $sql = new Sql();

  $sql->query('DELETE FROM artistas
  WHERE id_artista = :idArtista', [':idArtista'],[$idArtista]);
