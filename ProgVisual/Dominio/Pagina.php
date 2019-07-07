<?php
class Pagina extends Base {
    public $nome;
    public $descricao;
    
    public function __construct($nome, $descricao) {
        $this->nome = $nome;
        $this->descricao = $descricao;
    }
}
