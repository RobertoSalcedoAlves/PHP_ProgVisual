<?php
class DataCenter extends BaseDAO {
    public $id_endereco;
    
    public function getNomeCampos() { return 'id_endereco'; }
    public function getNomeTabela() { return 'tbl_datacenter'; }

    public function getValorCampos() {
        return "'"  .$this->id_endereco."','";
    }

    public function setDados($id,$id_endereco) {
        $this->id = $id;
        $this->id_endereco = $id_endereco;
    }

}
