<?php 
    include '../models/Musica.model.php';
    $idUsuario = $_GET['idUsuario'];
    $idMusica = $_GET['idMusica'];

    require_once('./sql.php');
    $sql = new Sql();
    $musicas = $sql->query('SELECT DISTINCT *
    FROM musicas as m 
    INNER JOIN albuns as alb 
    ON m.id_album = alb.id_album
    INNER JOIN artistas as art
    ON alb.id_artista = art.id_artista WHERE id_musica = :idMusica',
    ['idMusica'], [$idMusica]);


    $musicasLike = $sql->query('SELECT * 
    FROM musicas_like
    WHERE id_usuario = :idUsuario',
     [':idUsuario'], [$idUsuario]);

     $musicaJson = new Musica();
     foreach($musicas as $musica) {
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
        $musicaJson->album->artista->imagemArtista = $musica->imagem_artista;
        $musicaJson->idLike = -1;

        foreach($musicasLike as $mLike) {
            if($musicaJson->id == $mLike->id_musica) {
                $musicaJson->idLike = $mLike->id_like;
                break;
            }
        }
    }
    echo json_encode($musicaJson, JSON_PRETTY_PRINT);

?>