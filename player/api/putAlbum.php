<?php 
  require_once('./sql.php');

  $json = file_get_contents('php://input'); // Recebe o corpo da requisição

  $data = json_decode($json); // Decodifica o Json em um Objeto

  $idArtista = $data->idArtista;
  $idAlbum = $data->id;
  $titulo = $data->titulo;
  $lancamento = $data->lancamento;
  $capa = $data->capa;

  $sql = new Sql();
  $sql->query('UPDATE albuns SET id_artista = :idArtista, titulo_album = :titulo, ano_lancamento = :lancamento, capa = :capa
  WHERE id_album = :idAlbum',
  [':idArtista', ':titulo', ':lancamento', ':capa', ':idAlbum'],
  [$idArtista, $titulo, $lancamento, $capa, $idAlbum]);