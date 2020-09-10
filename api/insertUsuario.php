<?php
  $email = trim($_POST['email']);
  $senha = crypt('senha');
  $nome = trim($_POST['nome']);
  $genero = trim($_POST['genero']);
  $premium = 'N';

  if(!empty($email) && !empty($senha) && !empty($nome) && !empty($genero))
  {
    require_once('./sql.php');
    $sql = new Sql();
    $sql->query('INSERT INTO usuarios(email, senha, nome, genero, premium)
     VALUES(:email, :senha, :nome, :genero, :premium);',[':email', ':senha', ':nome', ':genero', ':premium'],[$email, $senha, $nome, $genero, $premium]);
    header("location:../home/index.html");
  }
?>