<?php 
  $json = file_get_contents('php://input'); // Recebe o corpo da requisição

  $data = json_decode($json); // Decodifica o Json em um Objeto

  $idArtista = $data->idArtista;
  $artista = $data->artista;
  $imagemBase64 = $data->imagemBase64;


  require_once('./sql.php');
  $sql = new Sql();
  $sql->query('UPDATE artistas 
  SET artista = :artista, imagem_artista = :imagemBase64 
  WHERE id_artista = :idArtista', 
  [':idArtista', ':artista', ':imagemBase64'], 
  [$idArtista, $artista, $imagemBase64]);