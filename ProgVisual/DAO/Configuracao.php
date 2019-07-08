<?php
class Configuracao extends BaseDAO {
    public $lag;
    public $ip;
    public $vlan;
    public $ospf;
    public $mpls;
    public $pppoe_server;
    public $ativa;
    public $data_inicio;
    public $data_fim;

    public function getNomeCampos() {
        return 'lag,ip,vlan,ospf,mpls,pppoe_server,ativa,data_inicio,data_fim';
    }

    public function getNomeTabela() { return 'tbl_configuracao'; }

    public function getValorCampos() {
        return "'"  .$this->lag."','"
                    .$this->ip."','"
                    .$this->vlan."','"
                    .$this->ospf."','"
                    .$this->mpls."','"
                    .$this->pppoe_server."','"
                    .$this->ativa."','"
                    .$this->data_inicio."','"
                    .$this->data_fim."' ";
    }

    public function setDados($id,$lag,$ip,$vlan,$ospf,$mpls,$pppoe_server,$ativa,$data_inicio,$data_fim) {
        $this->id = $id;
        $this->lag = $lag;
        $this->ip = $ip;
        $this->vlan = $vlan;
        $this->ospf = $ospf;
        $this->mpls = $mpls;
        $this->pppoe_server = $pppoe_server;
        $this->ativa = $ativa;
        $this->data_inicio = $data_inicio;
        $this->data_fim = $data_fim;
    }
}
