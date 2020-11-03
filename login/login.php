<?php
  $email = trim($_GET['email']);
  $senha = trim($_GET['senha']);

  require_once('../api/sql.php');
  $sql = new Sql();
  $usuario = $sql->query('SELECT * FROM usuarios WHERE email = :email',['email'],[$email])[0];

  if(md5($senha) == $usuario->senha)
  {
    session_start();
    $_SESSION['nome']=$usuario->nome;
    $_SESSION['idUsuario']=$usuario->id_usuario;
    $_SESSION['email']=$usuario->email;
    $_SESSION['premium']=$usuario->premium;
    $_SESSION['genero'] = $usuario->genero;
    $_SESSION['foto'] = $usuario->foto;

    header("location:../player/audio.php");
  }
  else
    header("location:index.html");
?>
