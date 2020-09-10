<?php 
    include 'Album.model.php';
    class Musica {
        public $id;
        public $titulo;
        public $musica;
        public $album;

        public function __construct(){
            $this->album = new Album();
        }
    }
