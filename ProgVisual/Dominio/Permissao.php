<?php
class Permissao extends Base{
    public $descricao;
    
    public function __construct($descricao) {
        $this->descricao = $descricao;
    }
}
