<?php 

$array = ['nome' => 'Lucas', 'idade' => 19];

echo json_encode($array, JSON_PRETTY_PRINT);


/*

$musica = file_get_contents('C:\xampp\htdocs\audio\Death Grips - Get Got.mp3');

$array['musica'] = base64_encode($musica);

echo json_encode($musica, JSON_PRETTY_PRINT);
*/


// Importa sql
// require_once('./sql.php');
// $sql = new Sql();


// $artistas = $sql->query('SELECT * FROM ARTISTAS WHERE id_artista=:id', [':id'], [1]);

// var_dump($artistas);

// // usar foreach pra montar o objeto, usar echo pro retorno final, que será pego no js
// foreach($artistas as $artista) {
//     echo $artista->nome;
//     $artista->viado = true;
//     echo $artista->viado;
// }