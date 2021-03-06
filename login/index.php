<?php
session_start();
$erro = isset($_SESSION['erroLoginUsuario']) ? $_SESSION['erroLoginUsuario'] : null;
unset($_SESSION['erroLoginUsuario']);
?>


<!DOCTYPE html>
<html lang="pt-br">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login - Spotifree</title>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
  <link rel="stylesheet" href="style.css">
  <link rel="shortcut icon" href="img/icon-free.ico">
  <link rel="stylesheet" href="../styleGeral.css">
</head>

<body class="bg-color">
  <div class="container-fluid h-100">
    <div class="row form-login justify-content-center p-4">
      <div class="col-md-4 align-self-center area-form">
        <div class="row justify-content-center mb-4">
          <img src="img/logo.png" alt="Logo Spotifree" class="d-block img-link" onclick="window.location.href='../home/index.html'">
        </div>
        <hr>
        <h2 class="big d-block text-center main-txt">Para continuar, faça login no Spotifree.</h2>
        <form action="login.php" method="GET" id="formulario-login" name="formulario-login">
          <div class="input-group mt-2">
            <input id="email" name="email" type="email" class="form-control bg-light btn-outline-secondary" placeholder="Endereço de-mail." required>
          </div>
          <div class="input-group mt-2">
            <input id="senha" name="senha" type="password" class="form-control bg-light btn-outline-secondary" placeholder="Senha." required>
          </div>
          <?php if (isset($erro)) {?>
            <div class="label-group text-danger">
              <?php echo $erro?>
            </div>
            <?php }?>
          <div class="row">
            <div class="col-md-12 entrar-section">
              <button type="submit" class="btn-login mt-2">Entrar</button>
            </div>
          </div>
        </form>
        <hr>
        <div class="cadastro-section">
          Não tem uma conta?
          <div class="button-area">
            <a class="btn btn-cadastro" href="../cadastro/index.php">Inscrever-se no Spotifree</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <script src="script.js"></script>
</body>

</html>