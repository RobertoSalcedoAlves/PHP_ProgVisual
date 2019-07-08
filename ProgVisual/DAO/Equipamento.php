<?php
class Equipamento extends BaseDAO {
    public $num_serie;
    public $identity;
    public $versao_firmware;
    public $prefixo_backup;
    
    public function getNomeCampos() { return 'num_serie,identity,versao_firmware,prefixo_backup'; }
    public function getNomeTabela() { return 'tbl_equipamento'; }

    public function getValorCampos() {
        return "'"  .$this->num_serie. "','"
                    .$this->identity. "','"
                    .$this->versao_firmware. "','"
                    .$this->prefixo_backup. "' ";
    }

    public function setDados($id,$num_serie,$identity,$versao_firmware,$prefixo_backup) {
        $this->id = $id;
        $this->num_serie = $num_serie;
        $this->identity = $identity;
        $this->versao_firmware = $versao_firmware;
        $this->prefixo_backup = $prefixo_backup;
    }
}
