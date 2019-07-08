<?php
class Backup extends BaseDAO {
    public $data;
    public $nome;
    
    public function getNomeCampos() { return 'data,nome'; }
    public function getNomeTabela() { return 'tbl_backup'; }   
    
    public function getValorCampos() {
        return "'"  .$this->data."','"
                    .$this->nome."' ";
    }

    public function setDados($id,$data,$nome) {
        $this->id           = (isset($id)) ? $id : null;
        $this->data         = $data;
        $this->nome         = $nome;
    }    
}
