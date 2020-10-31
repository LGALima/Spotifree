<?php 
  $json = file_get_contents('php://input'); // Recebe o corpo da requisição

  $data = json_decode($json); // Decodifica o Json em um Objeto

  $artista = $data->artista;
  $imagemBase64 = $data->imagemBase64;


  require_once('./sql.php');
  $sql = new Sql();
  $sql->query('INSERT INTO artistas (artista, imagem_artista)
  VALUES (:artista, :imagemBase64)', 
  [':artista', ':imagemBase64'], [$artista, $imagemBase64]);
