<?php
$email = trim($_POST['email']);
$senha = md5($_POST['senha']);
$nome = trim($_POST['nome']);
$genero = trim($_POST['genero']);
$premium = 'N';

if (!empty($email) && !empty($senha) && !empty($nome) && !empty($genero)) {
  require_once('./sql.php');
  $sql = new Sql();
  $sql->query('INSERT INTO usuarios(email, senha, nome, genero, premium)
     VALUES(:email, :senha, :nome, :genero, :premium);', [':email', ':senha', ':nome', ':genero', ':premium'], [$email, $senha, $nome, $genero, $premium]);

  $usuario = $sql->query('SELECT * FROM usuarios WHERE email = :email', ['email'], [$email])[0];

  session_start();
  $_SESSION['nome'] = $usuario->nome;
  $_SESSION['idUsuario'] = $usuario->id_usuario;
  $_SESSION['email'] = $usuario->email;
  $_SESSION['premium'] = $usuario->premium;
  $_SESSION['genero'] = $usuario->genero;
  $_SESSION['foto'] = '';

  header("location:../player/audio.php");
}
