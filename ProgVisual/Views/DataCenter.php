<?php
class DataCenter extends Base {
    public $endereco;
    public $racks;
    
    public function __construct($endereco,$racks) {
        $this->endereco = $endereco;
        $this->racks = $racks;
    }
}
