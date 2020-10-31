<?php 
  require_once('./sql.php');

  $json = file_get_contents('php://input'); // Recebe o corpo da requisição

  $data = json_decode($json); // Decodifica o Json em um Objeto

  $idArtista = $data->idArtista;
  $titulo = $data->titulo;
  $lancamento = $data->lancamento;
  $capa = $data->capa;

  $sql = new Sql();
  $sql->query('INSERT INTO albuns (id_artista, titulo_album, ano_lancamento, capa)
  VALUES (:idArtista, :titulo, :lancamento, :capa)',
  [':idArtista', ':titulo', ':lancamento', ':capa'],[$idArtista, $titulo, $lancamento, $capa]);
