<?php 
    include '../models/Musica.model.php';
    $idPlaylist = $_GET['idPlaylist'];
    $idUsuario = $_GET['idUsuario'];

    require_once('./sql.php');
    $sql = new Sql();
    $musicas = $sql->query('SELECT DISTINCT *
    FROM musica_playlist as mp
    INNER JOIN musicas as m
    ON mp.id_musica = m.id_musica
    INNER JOIN albuns as alb 
    ON m.id_album = alb.id_album
    INNER JOIN artistas as art
    ON alb.id_artista = art.id_artista
    WHERE id_playlist = :idPlaylist',
    ['idPlaylist'], [$idPlaylist]);

    $musicasLike = $sql->query('SELECT * 
    FROM musicas_like
    WHERE id_usuario = :idUsuario',
     [':idUsuario'], [$idUsuario]);

    $musicasJson = [];
    foreach($musicas as $musica) {
        $musicaJson = new Musica();
        $musicaJson->id = $musica->id_musica;
        $musicaJson->idMusicaPlaylist = $musica->id_musica_playlist;
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
        $musicaJson->album->artista->imagemArtista = $musica->imagem_artista;
        $musicaJson->idLike = -1;

        foreach($musicasLike as $mLike) {
            if($musicaJson->id == $mLike->id_musica) {
                $musicaJson->idLike = $mLike->id_like;
                break;
            }
        }
        array_push($musicasJson, $musicaJson);
    }

    echo json_encode($musicasJson, JSON_PRETTY_PRINT);