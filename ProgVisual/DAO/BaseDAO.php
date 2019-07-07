<?php
 abstract class BaseDAO extends Base implements ICRUD {
    private $nomeTabela;
    private $camposInsert;
    
    public function __get($atributo){ return $this->$atributo; }
    public function __set($atributo, $valor){ return $this->$atributo = $valor; }
    public function getId() { return $this->id;}
    public function getNomeCampos() { return $this->camposInsert;}
    public function getNomeTabela(){ return $this->nomeTabela;}
    
    public abstract function getValorCampos();
    public abstract function setDados();
    
    public function Salvar($objeto,$db){ $db->inserirNoBanco($objeto); }
    public function Atualizar($objeto,$db){ $db->atualizarNoBanco($objeto); }
    public function Selecionar($fields,$values,$db){ return $db->selecionarRegistro($this->getNomeTabela(),$fields,$values);}
    public function SelecionarTodos($fields,$values,$db){ return $db->selecionarRegistros($this->getNomeTabela(),$fields,$values); }
    public function Excluir($fields,$values,$db){ $db->DeleteDataDb($this->getNomeTabela(), $fields,$values); }
}
