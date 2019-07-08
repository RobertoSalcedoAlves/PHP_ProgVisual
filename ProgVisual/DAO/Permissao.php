<?php
class Permissao extends BaseDAO{
    public $descricao;
    
    public function getNomeCampos() { return 'descricao'; }
    public function getNomeTabela() { return 'tbl_permissao'; }

    public function getValorCampos() {
        return "'"  .$this->descricao. "' ";
    }

    public function setDados($id,$descricao) {
        $this->id = $id;
        $this->descricao = $descricao;
    }

}
