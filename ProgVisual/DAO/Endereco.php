<?php
class Endereco extends BaseDAO {
    public $uf;
    public $cidade;
    public $rua;
    public $numero;
    
    public function getNomeCampos() { return 'uf,cidade,rua,numero'; }
    public function getNomeTabela() { return 'tbl_endereco'; }

    public function getValorCampos() {
        return "'"  .$this->uf."','"
                    .$this->cidade."','"
                    .$this->rua."','"
                    .$this->numero."' ";
    }

    public function setDados($id,$uf,$cidade,$rua,$numero) {
        $this->id = $id;
        $this->uf = $uf;
        $this->cidade = $cidade;
        $this->rua = $rua;
        $this->numero = $numero;
    }
}
