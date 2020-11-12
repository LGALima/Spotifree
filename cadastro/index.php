<?php
session_start();
$erro = isset($_SESSION['erroCadastroUsuario']) ? $_SESSION['erroCadastroUsuario'] : null;
unset($_SESSION['erroCadastroUsuario']);

?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Inscrever-se - Spotifree</title>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
  <link rel="stylesheet" href="style.css">
  <link rel="shortcut icon" href="img/icon-free.ico">
  <link rel="stylesheet" href="../styleGeral.css">
</head>

<body class="bg-color">
  <div class="container-fluid h-100">
    <div class="row form-cadastro justify-content-center p-4">
      <div class="col-md-4 align-self-center area-form">
        <div class="row justify-content-center mb-4">
          <img src="img/logo.png" alt="Logo Spotifree" class="d-block img-link" onclick="window.location.href='../home/index.html'">
        </div>
        <h2 class="big d-block text-center main-txt">Inscreva-se grátis e comece a curtir.</h2>
        <form action="../api/insertUsuario.php" method="POST" id="formulario-cadastro" name="formulario-cadastro">
          <div class="label-group">
            <label for="email">Qual é o seu e-mail?</label>
          </div>
          <div class="input-group mt-2">
            <input id="email" name="email" type="email" class="form-control bg-light btn-outline-secondary" placeholder="Insira seu e-mail." required>
          </div>
          <div class="label-group">
            <label for="senha">Crie uma senha</label>
          </div>
          <div class="input-group mt-2">
            <input id="senha" name="senha" type="password" class="form-control bg-light btn-outline-secondary" placeholder="Crie uma senha." required minlength="8">
          </div>
          <div class="label-group">
            <label for="nome">Como devemos chamar você?</label>
          </div>
          <div class="input-group mt-2">
            <input id="nome" name="nome" type="text" class="form-control bg-light btn-outline-secondary" placeholder="Insira seu nome." required>
          </div>
          <div class="label-group">
            <label for="genero">Qual é o seu gênero?</label>
          </div>
          <div class="input-group">
            <input type="radio" id="masculino" name="genero" value="masculino" required>
            <div class="rdb-label">
              <label for="male">Masculino</label>
            </div>
            <input type="radio" id="feminino" name="genero" value="feminino" required>
            <div class="rdb-label">
              <label for="female">Feminino</label>
            </div>
            <input type="radio" id="outro" name="genero" value="outro" required>
            <div class="rdb-label">
              <label for="other">Outro</label>
            </div>


            <?php if (isset($erro)) {?>
            <div class="label-group text-danger">
              <?php echo $erro?>
            </div>
            <?php }?>
          </div>
          <div class="row">
            <div class="col-md-12">
              <button type="submit" class="btn-cadastrar mt-2">Inscrever-se</button>
            </div>
          </div>
        </form>
        <div class="login-section">
          Já tem uma conta? <a href="../login/index.php">Faça login</a>.
        </div>
      </div>
    </div>
  </div>
  <script src="script.js"></script>
</body>

</html>