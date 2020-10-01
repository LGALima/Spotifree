<?php

include '../models/Musica.model.php';

$idUsuario = $_GET['idUsuario'];

require_once('./sql.php');
$sql = new Sql();
$musicasLike = $sql->query('SELECT * 
    FROM musicas_like as ml
    INNER JOIN musicas as m 
    ON ml.id_musica = m.id_musica
    INNER JOIN albuns as alb 
    ON m.id_album = alb.id_album
    INNER JOIN artistas as art
    ON alb.id_artista = art.id_artista
    WHERE id_usuario = :idUsuario 
    ORDER BY ml.id_like',
     [':idUsuario'], [$idUsuario]);

     $musicasJson = [];

     foreach($musicasLike as $musica) {
        $musicaJson = new Musica();
        $musicaJson->id = $musica->id_musica;
        $musicaJson->titulo = $musica->titulo_musica;
        $musicaJson->musica = $musica->musica;
        $musicaJson->tempo = $musica->tempo;
        $musicaJson->album->id = $musica->id_album;
        $musicaJson->album->titulo = $musica->titulo_album;
        $musicaJson->album->lancamento = $musica->ano_lancamento;
        $musicaJson->album->capa = $musica->capa;
        $musicaJson->album->artista->id = $musica->id_artista;
        $musicaJson->album->artista->ouvintes = $musica->total_ouvintes;
        $musicaJson->album->artista->artista = $musica->artista;
        $musicaJson->idLike = $musica->id_like;
        array_push($musicasJson, $musicaJson);
    }

    echo json_encode($musicasJson, JSON_PRETTY_PRINT);
