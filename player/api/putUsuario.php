<?php
$json = file_get_contents('php://input'); // Recebe o corpo da requisição

$data = json_decode($json); // Decodifica o Json em um Objeto

$nome = $data->nome;
$email = $data->email;
$senha = $data->senha;
$foto = $data->foto;
$idUsuario = $_GET['idUsuario'];

require_once('./sql.php');
$sql = new Sql();
$usuario = $sql->query('SELECT * FROM usuarios WHERE email = :email', ['email'], [$email])[0];

if (md5($senha) == $usuario->senha) {
    $sql->query('UPDATE usuarios SET nome = :nome, email = :email, foto = :foto WHERE id_usuario = :idUsuario', [':nome', ':email', ':foto', ':idUsuario'], [$nome, $email, $foto, $idUsuario]);
    session_start();
    $_SESSION['nome']=$usuario->nome;
    $_SESSION['email']=$usuario->email;
    $_SESSION['foto']=$usuario->foto;
    echo 'sucesso';
} else {
    echo 'erro';
}
