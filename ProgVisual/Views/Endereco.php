<?php
class Endereco extends Base {
    public $estado;
    public $cidade;
    public $rua;
    public $numero;
    
    public function __construct($estado,$cidade,$rua,$numero) {
        $this->estado = $estado;
        $this->cidade = $cidade;
        $this->rua = $rua;
        $this->numero = $numero;
    }
}
