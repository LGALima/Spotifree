<?php
$email = trim($_GET['email']);
$senha = trim($_GET['senha']);

require_once('../api/sql.php');
$sql = new Sql();
$usuario = $sql->query('SELECT * FROM usuarios WHERE email = :email', ['email'], [$email])[0];

if (empty($email) || empty($senha)) {
  session_start();
  $_SESSION['erroLoginUsuario'] = 'Preencha seus dados corretamente';
  header("location:index.php");
  die();
}

if (md5($senha) == $usuario->senha) {
  session_start();
  $_SESSION['nome'] = $usuario->nome;
  $_SESSION['idUsuario'] = $usuario->id_usuario;
  $_SESSION['email'] = $usuario->email;
  $_SESSION['premium'] = $usuario->premium;
  $_SESSION['genero'] = $usuario->genero;
  $_SESSION['foto'] = $usuario->foto;
  $_SESSION['adm'] = $usuario->adm;
  header("location:../player/audio.php");
} else {
  session_start();
  $_SESSION['erroLoginUsuario'] = 'E-mail e/ou senha incorretos';
  header("location:index.php");
  die();
}
