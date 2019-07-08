<?php
class RackDataCenter extends BaseDAO {
    public $id_datacenter;
    public $id_rack;
    
    public function getNomeCampos() { return 'id_datacenter,id_rack'; }
    public function getNomeTabela() { return 'tbl_rack_datacenter'; }   
    
    public function getValorCampos() {
        return "'"  .$this->id_datacenter."','"
                    .$this->id_rack."' ";
    }

    public function setDados($id,$id_datacenter,$id_rack) {
        $this->id               = (isset($id)) ? $id : null;
        $this->id_datacenter    = $id_datacenter;
        $this->id_rack          = $id_rack;
    }    
}
