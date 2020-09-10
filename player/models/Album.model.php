<?php 
    include 'Artista.model.php';
    class Album {
        public $id;
        public $titulo;
        public $lancamento;
        public $capa;
        public $artista;

        public function __construct(){
            $this->artista = new Artista();
        }
    }
?>