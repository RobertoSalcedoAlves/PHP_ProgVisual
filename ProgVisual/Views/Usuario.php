<?php
class Usuario extends Base {
    public $nome;
    public $login;
    public $senha;
    public $permissao;
    public $email;
    public $telefone;
    
    public function __construct($nome, $login, $senha, $permissao, $email, $telefone) {
        $this->nome = $nome;
        $this->login = $login;
        $this->senha = $senha;
        $this->permissao = $permissao;
        $this->email = $email;
        $this->telefone = $telefone;
    }
}
