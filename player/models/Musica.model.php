<?php 
    include 'Album.model.php';
    class Musica {
        public $id;
        public $titulo;
        public $musica;
        public $album;
        public $tempo;
        public $idLike;

        public function __construct(){
            $this->album = new Album();
        }
    }
