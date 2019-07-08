<?php
class Rack extends BaseDAO {
    public $identificador;

    public function getNomeCampos() { return 'identificador'; }
    public function getNomeTabela() { return 'tbl_rack'; }

    public function getValorCampos() {
        return "'"  .$this->identificador. "' ";
    }

    public function setDados($id,$identificador) {
        $this->id = $id;
        $this->identificador = $identificador;
    }

}
