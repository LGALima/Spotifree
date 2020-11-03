<?php 
  $idMusica = $_GET['idMusica'];
  require_once('./sql.php');
  $sql = new Sql();

  $sql->query('DELETE FROM musicas
  WHERE id_musica = :idMusica', [':idMusica'],[$idMusica]);
