<?php
class Equipamento extends Base {
    public $numSerie;
    public $identity;
    public $versao;
    public $prefixoBackup;
    public $configuracoes;
    public $backups;
    
    public function __construct($id,$numSerie,$identity,$versao,$prefixoBackup,$configuracoes,$backups) {
        $this->id = $id;
        $this->numSerie = $numSerie;
        $this->identity = $identity;
        $this->versao = $versao;
        $this->prefixoBackup = $prefixoBackup;
        $this->configuracoes = $configuracoes;
        $this->backups = $backups;
    }
}
