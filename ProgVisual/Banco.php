<?php
class Banco{
        private $local;
        private $user;
        private $senha;
        private $msg0;
        private $msg1;
        private $nome_db;
        private $db;
        public function __construct(){
            $this->local    =       'localhost';
            $this->user     =       'root';
            $this->senha    =       'teste';
            $this->msg0     =       'Erro de conexão: '.mysql_error();
            $this->msg1     =       'Não foi possível selecionar o banco de dados!';
            $this->nome_db  =       'basedados';
        }
        public function abrir(){
            $this->db = mysql_connect($this->local,$this->user,$this->senha) or die($this->msg0);
            mysql_select_db($this->nome_db,$this->db) or die($this->msg1);
        }
        public function fechar(){
            //analisar se o mysql_close precisa ser colocado numa variável
            //$closed = mysql_close($this->db);
            //$closed = NULL;
            mysql_close($this->db);
        }
        public function inserirNoBanco($objeto){ 
            $db = new Banco();
            $db->abrir();
            $sql = "INSERT INTO ".$objeto->getNomeTabela()."(".$objeto->getNomeCampos().") VALUES ( ".$objeto->getValorCampos().")";
            $query = mysql_query($sql) or die ($sql.' '.mysql_error());
            $db->fechar(); 
            $temp_id = explode('_',$objeto->getNomeTabela());
            unset($objeto);
            header('location: '.$temp_id[1].'.php?msg=Inserido');
        }
        private function BuscaValor($campo,$tb_name,$fields_where,$values_where){ 
            $qtd = count($fields_where);
            if ($qtd != count($values_where)){ // verifica o numero de fields e values 
                ?>
                    <script language="javascript">
                        alert('Função: selecionarRegistro. Erro: Quantidade de campos diferente da quantidade de valores');
                    </script>
                <?php                      
            }
            else{
                // Monta a string SQL=====================
                $sql = "select ".$campo." from ".$tb_name;
                if ($qtd != 0 ) {
                    for ($j=1;$j<=$qtd;$j++){
                        if ($j == 1) { $sql .= ' where '; } //garante que o where entre caso tenha algum parâmetro
                        $sql .= $fields_where[$j].' = '.$values_where[$j];              
                        if ($j<$qtd )  { $sql .= ' and '; }
                    }
                } //=======================================
                $res = mysql_query($sql) or die ($sql .mysql_error());
                $linha = mysql_fetch_array($res);
                return $linha[$campo]; // retorna o valor do campo especifico, com os parametros enviados (podendo ser nenhum ou vários)
            }//else
        }//public function
        public function selecionarRegistro($tb_name,$fields_where,$values_where){ 
            // nome da tabela, vetores: campos(fields), valores(values) da consulta
            $obj = explode('_',$tb_name);
            $new_objeto = new $obj[1];
            $db = new Banco();
            $db->abrir();
            $fields = mysql_list_fields($this->nome_db,$tb_name); // informa os fields/campos da tabela do banco
            $columns = mysql_num_fields($fields); //conta o número de campos
            for ($i = 0; $i < $columns; $i++) {
                $fields_name    = mysql_field_name($fields, $i);
                $fields_values = $this->BuscaValor(mysql_field_name($fields, $i),$tb_name,$fields_where,$values_where); 
                $new_objeto->$fields_name = $fields_values;
            }
            $db->fechar();
            return $new_objeto;
        }
        public function selecionarRegistros( $tb_name, $fields_where, $values_where){  // nome da tabela, vetores: campos(fields), valores(values) da consulta
            $obj = explode('_',$tb_name);
            $qtd = count($fields_where);
            $db = new Banco();
            $db->abrir();

            // <Monta a string SQL> =====================
            $sql = "SELECT id_".$obj[1]." FROM ".$tb_name;
            if ($qtd >= 1 ) {
                for ($j=1;$j<=$qtd;$j++){
                    if ($j == 1) { $sql .= ' WHERE '; }//garante que o where entre caso tenha algum parametro
                    $sql .= $fields_where[$j].' = '.$values_where[$j];              
                    if ($j<$qtd )  { $sql .= ' AND '; }
                }
            } //==================== </Monta a string SQL>

            $query = mysql_query($sql) or die ($sql .mysql_error());
            $h = 0; // inicializamos a variável
            // Laço que trará TODOS os objetos já alimentados
            while ($linha = mysql_fetch_array($query)){
                $objDTO = new $obj[1];
                $fields_where[$qtd+1] = 'id_'.$obj[1];
                $values_where[$qtd+1] = $linha[$fields_where[$qtd+1]];
                $fields = mysql_list_fields($this->nome_db,$tb_name); // informa os fields/campos da tabela do banco
                $columns = mysql_num_fields($fields); //conta o número de campos
                $new_objeto[$h] = clone $objDTO; //Aqui declaramos um novo objeto que é clone de nosso DAO, no momento sendo apenas um DTO.
                for ($i = 0; $i < $columns; $i++) {
                        $fields_name    = mysql_field_name($fields, $i);
                        $fields_values = $this->BuscaValor(mysql_field_name($fields, $i),$tb_name,$fields_where,$values_where);
                        $new_objeto[$h]->$fields_name = $fields_values;
                }
                $h += 1; //chamamos o próximo objeto
            } //fecha o while, terminando nosso vetor de objetos.
            $db->fechar();
            return $new_objeto; //retorna todos os objetos populados
        }
} //class
