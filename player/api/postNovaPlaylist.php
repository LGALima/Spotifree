<?php 
    include '../models/Musica.model.php';

    $json = file_get_contents('php://input'); // Recebe o corpo da requisição

    $data = json_decode($json); // Decodifica o Json em um Objeto

    $idUsuario = $data->idUsuario;
    $titulo = $data->titulo;
    $imagemBase64 = $data->imagemBase64;


    require_once('./sql.php');
    $sql = new Sql();
    $sql->query('INSERT INTO playlists (id_usuario, titulo_playlist, quantidade_musicas, capa_playlist)
    VALUES (:idUsuario, :titulo, 0, :imagemBase64)', 
    [':idUsuario', ':titulo', ':imagemBase64'], [$idUsuario, $titulo, $imagemBase64]);

    echo $imagemBase64;