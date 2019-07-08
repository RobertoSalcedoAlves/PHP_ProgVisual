<?php
class BackupEquipamento extends BaseDAO {
    public $id_backup;
    public $id_equipamento;
    
    public function getNomeCampos() { return 'id_backup,id_equipamento'; }
    public function getNomeTabela() { return 'tbl_backup_equipamento'; }   
    
    public function getValorCampos() {
        return "'"  .$this->id_backup."','"
                    .$this->id_equipamento."' ";
    }

    public function setDados($id,$id_backup,$id_equipamento) {
        $this->id               = (isset($id)) ? $id : null;
        $this->id_backup        = $id_backup;
        $this->id_equipamento   = $id_equipamento;
    }    
}
