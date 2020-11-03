<?php 
  require_once('./sql.php');

  $json = file_get_contents('php://input'); // Recebe o corpo da requisição

  $data = json_decode($json); // Decodifica o Json em um Objeto

  $idMusica = $data->id;
  $titulo = $data->titulo;
  $musica = $data->musica;
  $tempo = $data->tempo;

  $sql = new Sql();
  $sql->query('UPDATE musicas SET titulo_musica = :titulo, musica = :musica, tempo = :tempo
  WHERE id_musica = :idMusica',
  [':titulo', ':musica', ':tempo', ':idMusica'],
  [$titulo, $musica, $tempo, $idMusica]);