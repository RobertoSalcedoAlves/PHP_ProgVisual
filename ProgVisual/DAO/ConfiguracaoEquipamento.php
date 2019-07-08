<?php
class ConfiguracaoEquipamento extends BaseDAO {
    public $id_configuracao;
    public $id_equipamento;
    
    public function getNomeCampos() { return 'id_configuracao,id_equipamento'; }
    public function getNomeTabela() { return 'tbl_configuracao_equipamento'; }   
    
    public function getValorCampos() {
        return "'"  .$this->id_configuracao."','"
                    .$this->id_equipamento."' ";
    }

    public function setDados($id,$id_configuracao,$id_equipamento) {
        $this->id               = (isset($id)) ? $id : null;
        $this->id_configuracao  = $id_configuracao;
        $this->id_equipamento   = $id_equipamento;
    }    
}
