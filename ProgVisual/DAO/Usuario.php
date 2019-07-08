<?php
include '../DAO/BaseDAO.php';

class Usuario extends BaseDAO {
    public $nome;
    public $login;
    public $senha;
    public $email;
    public $telefone;
    public $id_permissao;
    
    public function getNomeCampos() { return 'nome,login,senha,email,telefone,id_permissao'; }
    public function getNomeTabela() { return 'tbl_usuario'; }

    public function getValorCampos() {
        return "'"  .$this->nome. "','"
                    .$this->login. "','"
                    .$this->senha. "','"
                    .$this->email. "','"
                    .$this->telefone. "','"
                    .$this->id_permissao. "' ";
    }

    public function setDados($id,$nome, $login, $senha, $email, $telefone,$id_permissao) {
        $this->id = $id;
        $this->nome = $nome;
        $this->login = $login;
        $this->senha = $senha;
        $this->email = $email;
        $this->telefone = $telefone;
        $this->id_permissao = $id_permissao;
    }
}
