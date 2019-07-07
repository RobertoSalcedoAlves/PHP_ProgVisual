<?php
class Backup extends Base {
    public $data;
    public $nomeBackup;
    public $avisoBackup;
    
    public function __construct($data,$nomeBackup,$avisoBackup) {
        $this->data = $data;
        $this->nomeBackup = $nomeBackup;
        $this->avisoBackup = $avisoBackup;
    }
}
