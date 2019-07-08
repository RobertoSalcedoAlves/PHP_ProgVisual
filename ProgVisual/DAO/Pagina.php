<?php
class Pagina extends BaseDAO {
    public $nome;
    public $descricao;
    
    public function getNomeCampos() { return 'nome,descricao'; }
    public function getNomeTabela() { return 'tbl_pagina'; }

    public function getValorCampos() {
        return "'"  .$this->nome. "','"
                    .$this->descricao. "' ";
    }

    public function setDados($id,$nome,$descricao) {
        $this->id = $id;
        $this->nome = $nome;
        $this->descricao = $descricao;
    }
}
