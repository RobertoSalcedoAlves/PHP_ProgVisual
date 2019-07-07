<?php
interface ICRUD {
    public function setDados();
    public function getId();
    public function getNomeTabela();
    public function getNomeCampos();
    public function getValorCampos();
    public function Salvar($objeto,$db);
    public function Atualizar($objeto,$db);
    public function Selecionar($fields,$values,$db);
    public function SelecionarTodos($fields,$values,$db);
    public function Excluir($fields,$values,$db);
}
