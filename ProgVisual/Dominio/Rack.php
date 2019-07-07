<?php
class Rack extends Base {
    public $identificador;
    public $equipamentos;
    
    public function __construct($identificador,$equipamentos) {
        $this->identificador = $identificador;
        $this->equipamentos = $equipamentos;
    }
}
