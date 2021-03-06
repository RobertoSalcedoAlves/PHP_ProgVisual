<?php
class PermissaoPagina extends BaseDAO {
    public $id_permissao;
    public $id_pagina;
    
    public function getNomeCampos() { return 'id_permissao,id_pagina'; }
    public function getNomeTabela() { return 'tbl_permissao_pagina'; }   
    
    public function getValorCampos() {
        return "'"  .$this->id_permissao."','"
                    .$this->id_pagina."' ";
    }

    public function setDados($id,$id_permissao,$id_pagina) {
        $this->id               = (isset($id)) ? $id : null;
        $this->id_permissao       = $id_permissao;
        $this->id_pagina  = $id_pagina;
    }    
}
