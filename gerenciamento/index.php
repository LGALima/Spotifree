<?php 
session_start();
if (!isset($_SESSION['idUsuario']) || 
!isset($_SESSION['adm']) || 
$_SESSION['adm'] != 'S') {
    header("location:../login/index.php");
}
?>
<!DOCTYPE html>
<html lang="pt-br">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Gerenciamento</title>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;700&display=swap" rel="stylesheet">
  <script src="https://kit.fontawesome.com/1923c790bd.js" crossorigin="anonymous"></script>
  <link rel="shortcut icon" href="../img/music-symbol.png">
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
  <link rel="stylesheet" href="style.css">
  <link rel="stylesheet" href="../styleGeral.css">
</head>

<body class="bg-color">
  <div class="main-cont container-fluid h-100">

    <div class="row col-12 justify-content-center pt-4 main-div">
      <div class="col-4">
        <i class="fas fa-microphone fa-5x icon-fa"></i>
      </div>
      <div class="col-4">
        <i class="fas fa-record-vinyl fa-5x icon-fa"></i>
      </div>
      <div class="col-4">
        <i class="fas fa-music fa-5x icon-fa"></i>
      </div>
    </div>

    <div class="row col-12 buttons justify-content-center p-2 main-div">
      <div class="col-4 align-self-top">
        <div class="area-btn">
          <button type="button" onclick="acaoAdicionar('artista')" class="btn-form mt-2" id="btn-adc-art"><i class="fas fa-plus"></i> Adicionar</i></button>
          <button type="button" onclick="acaoEditar('artista')" class="btn-form mt-2" id="btn-edt-art"><i class="fas fa-edit"></i> Editar</button>
          <button type="button" onclick="acaoRemover('artista')" class="btn-form mt-2" id="btn-rem-art"><i class="fas fa-trash-alt"></i> Remover</i></button>
        </div>
        <div class="row p-3 dropdown">
          <button class="col-12 btn btn-dropd dropdown-toggle" type="button" id="dropd-artistas" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" disabled>
          Artistas</button>
          <div class="dropdown-menu col-12" aria-labelledby="dropdownButton" id="dropdown-itens-artistas">
             <!-- Itens dropdown -->
          </div>
        </div>

        <div class="row pt-3 area-selecao">
          <p class="selecao">Artista selecionado: <span id="selecao-artista"></span></p>
        </div>
        <div class="row col-12 p-3 area-form">
          <form action="" method="POST" id="cadastro-artista" name="cadastro-artista">
            <div class="input-group">
              <input type="text" id="nome-artista" name="nome-artista" class="form-control bg-light btn-outline-secondary" placeholder="Nome do artista/banda." required maxlength="50" disabled>
            </div>
            <div class="input-group pt-2 file-upload">
              <label for="imagem-artista">Imagem do artista:</label><br>
              <img id="imagem-foto-artista" style="width: 100%;max-width:100%; height:auto;"> <!-- Imagem selecionada ou do artista selecionado -->
              <input type="file" id="imagem-artista" onchange="carregarFotoArtista(this)" class="mt-2" disabled> <!-- Selecionador de imagem -->
            </div>

          </form>
        </div>
        <div class="row col-12 p-4 area-btn justify-content-center">
          <button type="submit" class="btn-form mt-2" id="btn-salvar-artista"><i class="fas fa-save"></i> Salvar</button>
          <button type="reset" onclick="acaoCancelar('artista')" class="btn-form mt-2"><i class="fas fa-times"></i> Cancelar</button>
        </div>
      </div>

      <div class="col-4 align-self-top">
        <div class="area-btn">
          <button type="button" onclick="acaoAdicionar('album')" class="btn-form mt-2" id="btn-adc-alb"><i class="fas fa-plus"></i> Adicionar</i></button>
          <button type="button" onclick="acaoEditar('album')" class="btn-form mt-2" id="btn-edt-alb"><i class="fas fa-edit"></i> Editar</button>
          <button type="button" onclick="acaoRemover('album')" class="btn-form mt-2" id="btn-rem-alb"><i class="fas fa-trash-alt"></i> Remover</button>
        </div>
        <div class="row px-3 pt-3 dropdown">
          <button class="col-12 btn btn-dropd dropdown-toggle" type="button" id="dropd-artistas-albuns" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" disabled>
          Artistas</button>
          <div class="dropdown-menu col-12" id="dropdown-artistas-albuns" aria-labelledby="dropdownButton">
          <!-- itens do artista --> 
          </div>
        </div>
        <div class="row px-3 pt-2 pb-3 dropdown">
          <button class="col-12 btn btn-dropd dropdown-toggle" type="button" id="dropd-albuns" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" disabled>
          Álbuns</button>
          <div class="dropdown-menu col-12" id="dropdown-albuns" aria-labelledby="dropdownButton">
          <!-- itens do album --> 
          </div>
        </div>
        <div class="row area-selecao">
          <p class="selecao">Artista selecionado: <span id="selecao-artistas"></span></p>
        </div>
        <div class="row area-selecao">
          <p class="selecao">Álbum selecionado: <span id="selecao-album"></span></p>
        </div>
        <div class="row col-12 p-3 area-form">
          <form action="" method="POST" id="cadastro-album" name="cadastro-album">
            <div class="input-group">
              <input type="text" id="nome-album" name="nome-album" class="form-control bg-light btn-outline-secondary" placeholder="Nome do álbum." required disabled>
            </div>
            <div class="input-group pt-2">
              <input type="number" id="ano-lancamento" name="ano-lancamento" class="form-control bg-light btn-outline-secondary" placeholder="Ano de lançamento." required maxlength="4" disabled>
            </div>
            <div class="input-group pt-3 file-upload">
              <label for="capa-album">Capa do álbum:</label><br>
              <img id="imagem-foto-album" style="width: 100%;max-width:100%; height:auto;"> <!-- Imagem selecionada ou do album selecionado -->
              <input type="file" id="capa-album" onchange="carregarFotoAlbum(this)" class="mt-2" disabled>
            </div>
          </form>
        </div>
        <div class="row col-12 p-4 area-btn justify-content-center">
          <button type="submit" id="btn-salvar-album" class="btn-form mt-2"><i class="fas fa-save"></i> Salvar</button>
          <button type="reset" onclick="acaoCancelar('album')" class="btn-form mt-2"><i class="fas fa-times"></i> Cancelar</button>
        </div>
      </div>

      <div class="col-4 align-self-top">
        <div class="area-btn">
          <button type="button" onclick="acaoAdicionar('musica')" class="btn-form mt-2" id="btn-adc-mus"><i class="fas fa-plus"></i> Adicionar</button>
          <button type="button" onclick="acaoEditar('musica')" class="btn-form mt-2" id="btn-edt-mus"><i class="fas fa-edit"></i> Editar</button>
          <button type="button" onclick="acaoRemover('musica')" class="btn-form mt-2" id="btn-rem-mus"><i class="fas fa-trash-alt"></i> Remover</button>
        </div>
        <div class="row px-3 pt-3 dropdown">
          <button class="col-12 btn btn-dropd dropdown-toggle" type="button" id="dropd-artistas-musicas" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" disabled>
          Artistas</button>
          <div class="dropdown-menu col-12" id="dropdown-artistas-musicas" aria-labelledby="dropdownButton">
            <!-- itens do artista --> 
          </div>
        </div>
        <div class="row px-3 pt-2 dropdown">
          <button class="col-12 btn btn-dropd dropdown-toggle" type="button" id="dropd-albuns-musicas" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" disabled>
          Álbuns</button>
          <div class="dropdown-menu col-12" id="dropdown-albuns-musicas" aria-labelledby="dropdownButton">
            <!-- itens do album --> 
          </div>
        </div>
        <div class="row px-3 pt-2 pb-3 pdropdown">
          <button class="col-12 btn btn-dropd dropdown-toggle" type="button" id="dropd-musicas" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" disabled>
          Músicas</button>
          <div class="dropdown-menu col-12" id="dropdown-musicas" aria-labelledby="dropdownButton">
            <!-- itens da musica --> 
          </div>
        </div>
        <div class="row area-selecao">
          <p class="selecao">Artista selecionado: <span id="selecao-artista-musica"></span></p>
        </div>
        <div class="row area-selecao">
          <p class="selecao">Álbum selecionado: <span id="selecao-album-musica"></span></p>
        </div>
        <div class="row area-selecao">
          <p class="selecao">Música selecionada: <span id="selecao-musica"></span></p>
        </div>
        <div class="row col-12 p-3 area-form">
          <form action="" method="POST" id="cadastro-musica" name="cadastro-musica">
            <div class="input-group">
              <input type="text" id="nome-musica" name="nome-musica" class="form-control bg-light btn-outline-secondary" placeholder="Nome da música." required disabled>
            </div>
            <div class="input-group pt-2 file-upload">
                <label for="arquivo-musica">Música:</label>
                <audio style="width: 100%;" controls id="audio-musica"></audio> <br>
              <input type="file" id="arquivo-musica" onchange="carregarMusica(this)" class="mt-2" disabled>
            </div>
          </form>
        </div>
        <div class="row col-12 p-4 area-btn justify-content-center">
          <button type="submit"id="btn-salvar-musica" class="btn-form mt-2"><i class="fas fa-save"></i> Salvar</button>
          <button type="reset" onclick="acaoCancelar('musica')" class="btn-form mt-2"><i class="fas fa-times"></i> Cancelar</button>
        </div>
      </div>
    </div>
  </div>
  <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"
  integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN"
  crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"
  integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV"
  crossorigin="anonymous"></script>
  <script src="script.js"></script>
</body>

</html>