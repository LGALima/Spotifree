<?php
$idUsuario = $_GET['idUsuario'];
$senha = $_GET['senha'];
require_once('./sql.php');
$sql = new Sql();

$usuario = $sql->query('SELECT * FROM usuarios WHERE id_usuario = :idUsuario', [':idUsuario'], [$idUsuario])[0];

if (md5($senha) == $usuario->senha) {
    $sql->query('DELETE FROM usuarios WHERE id_usuario = :idUsuario', ['idUsuario'], [$idUsuario]);
    header("location:logout.php");
}
