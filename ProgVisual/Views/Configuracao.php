<?php
class Configuracao extends Base {
    public $lag;
    public $ip;
    public $vlan;
    public $ospf;
    public $mpls;
    public $pppoe;
    public $dataInicio;
    public $dataFim;
    public $ativa;
    
    public function __construct($lag,$ip,$vlan,$ospf,$mpls,$pppoe,$dataInicio,$dataFim,$ativa) {
        $this->lag = $lag;
        $this->ip = $ip;
        $this->vlan = $vlan;
        $this->ospf = $ospf;
        $this->mpls = $mpls;
        $this->pppoe = $pppoe;
        $this->dataInicio = $dataInicio;
        $this->dataFim = $dataFim;
        $this->ativa = $ativa;
    }
}
