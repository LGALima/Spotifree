<?php 
  require_once('./sql.php');

  $json = file_get_contents('php://input'); // Recebe o corpo da requisição

  $data = json_decode($json); // Decodifica o Json em um Objeto

  $idAlbum = $data->idAlbum;
  $titulo = $data->titulo;
  $musica = $data->musica;
  $tempo = $data->tempo;

  $sql = new Sql();
  $sql->query('INSERT INTO musicas (id_album, titulo_musica, musica, tempo)
  VALUES (:idAlbum, :titulo, :musica, :tempo)',
  [':idAlbum', ':titulo', ':musica', ':tempo'],[$idAlbum, $titulo, $musica, $tempo]);
