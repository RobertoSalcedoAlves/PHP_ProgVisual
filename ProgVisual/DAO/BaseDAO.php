<?php
include_once '../ICRUD.php';
 abstract class BaseDAO implements ICRUD {  
    public $id;
    public function __get($atributo){ return $this->$atributo; }
    public function __set($atributo, $valor){ return $this->$atributo = $valor; }
    public function getId() { return $this->id;}
    
    public abstract function getNomeCampos();
    public abstract function getNomeTabela();    
    public abstract function getValorCampos();
    
    public function Salvar($objeto,$db){ $db->inserirNoBanco($objeto); }
    public function Atualizar($objeto,$db){ $db->atualizarNoBanco($objeto); }
    public function Selecionar($fields,$values,$db){ return $db->selecionarRegistro($this->getNomeTabela(),$fields,$values);}
    public function SelecionarTodos($fields,$values,$db){ return $db->selecionarRegistros($this->getNomeTabela(),$fields,$values); }
    public function Excluir($fields,$values,$db){ $db->DeleteDataDb($this->getNomeTabela(), $fields,$values); }
}
