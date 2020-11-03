<?php 
    // Abre a sessao 
    session_start();

    // destrói as variaveis de sessão
    unset($_SESSION['idUsuario']);
    unset($_SESSION['nome']);
    unset($_SESSION['senha']);
    unset($_SESSION['email']);
    unset($_SESSION['premium']);
    unset($_SESSION['foto']);
    header("location:../../home");
?>