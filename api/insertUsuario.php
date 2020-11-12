<?php
$email = trim($_POST['email']);
$senha = md5($_POST['senha']);
$nome = trim($_POST['nome']);
$genero = trim($_POST['genero']);
$premium = 'N';
$adm = 'N';

if (!empty($email) && !empty($senha) && !empty($nome) && !empty($genero)) {
  require_once('./sql.php');
  $sql = new Sql();

  $usuario = $sql->query('SELECT * FROM usuarios WHERE email = :email', ['email'], [$email])[0];
  if (!empty($usuario->id_usuario)) {
    session_start();
    $_SESSION['erroCadastroUsuario'] = 'Este email já esta sendo usado';
    header('location: ../cadastro');
    die();
  }

  $sql->query('INSERT INTO usuarios(email, senha, nome, genero, premium, adm)
     VALUES(:email, :senha, :nome, :genero, :premium, :adm);', [':email', ':senha', ':nome', ':genero', ':premium', ':adm'], [$email, $senha, $nome, $genero, $premium, $adm]);

  $usuario = $sql->query('SELECT * FROM usuarios WHERE email = :email', ['email'], [$email])[0];

  session_start();
  $_SESSION['nome'] = $usuario->nome;
  $_SESSION['idUsuario'] = $usuario->id_usuario;
  $_SESSION['email'] = $usuario->email;
  $_SESSION['premium'] = $usuario->premium;
  $_SESSION['genero'] = $usuario->genero;
  $_SESSION['foto'] = '';
  $_SESSION['adm'] = $usuario->adm;

  header("location:../player/audio.php");
} else {
    session_start();
    $_SESSION['erroCadastroUsuario'] = 'Preencha os dados corretamente';
    header('location: ../cadastro');
    die();
}
