<?php
// Classe que gera uma conexão sql
class Sql{

    private $conection;

    public function __construct(){                               // nomeBanco, usuario e senha
        $this->conection = new \PDO('mysql:host=localhost;dbname=spotfree;', 'root', '');
    }

    // Espera a query, os parametros em ? ou :parametro e seus respectivos valores
    public function query($query, $parametros, $binds){
        $consulta = $this->conection->prepare($query);
        for($i = 0; $i < count($parametros); $i++){
            $consulta->bindParam($parametros[$i],$binds[$i]);
        }
        $consulta->execute();
        $resposta = $consulta->fetchAll(\PDO::FETCH_OBJ);
        return $resposta;
    }
}