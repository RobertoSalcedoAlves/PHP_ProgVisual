<?php
class Banco{
        private $local;
        private $user;
        private $senha;
        private $msg0;
        private $msg1;
        private $nome_db;
        private $db;
        private $mysqli;
        public function __construct(){
            $this->local    =       'localhost';
            $this->user     =       'root';
            $this->senha    =       'teste';
            $this->msg0     =       'Erro de conexão: ';
            $this->msg1     =       'Não foi possível selecionar o banco de dados!';
            $this->nome_db  =       'basedados';
        }
        protected function conectaDB(){
            try{
                $con=new mysqli($this->local,$this->user,$this->senha,$this->nome_db);
                return $con;
            } catch (Exception $ex) { $ex->getMessage(); }
        }
        public function fechar(){ mysqli_close($this->db); }
        
        public function inserirNoBanco($objeto){ 
            $db = new Banco();
            $conexao = $db->conectaDB();
            $sql = "INSERT INTO ".$objeto->getNomeTabela()."(".$objeto->getNomeCampos().") VALUES ( ".$objeto->getValorCampos().")";
            $query = mysqli_query($conexao, $sql) or die ('Erro ao gravar no banco.');
            $db->fechar(); 
            $temp_id = explode('_',$objeto->getNomeTabela());
            unset($objeto);
            header('location: ./Views/'.$temp_id[1].'.php?msg=Inserido');
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
                $res = mysqli_query($sql) or die ($sql .mysqli_error());
                $linha = mysqli_fetch_array($res);
                return $linha[$campo]; // retorna o valor do campo especifico, com os parametros enviados (podendo ser nenhum ou vários)
            }//else
        }//public function
        public function selecionarRegistro($tb_name,$fields_where,$values_where){ 
            // nome da tabela, vetores: campos(fields), valores(values) da consulta
            $obj = explode('_',$tb_name);
            $new_objeto = new $obj[1];
            $db = new Banco();
            $conexao = $db->conectaDB();
            //$db->abrir();
            $fields = mysqli_list_fields($this->nome_db,$tb_name); // informa os fields/campos da tabela do banco
            $columns = mysqli_num_fields($fields); //conta o número de campos
            for ($i = 0; $i < $columns; $i++) {
                $fields_name    = mysqli_field_name($fields, $i);
                $fields_values = $this->BuscaValor(mysqli_field_name($fields, $i),$tb_name,$fields_where,$values_where); 
                $new_objeto->$fields_name = $fields_values;
            }
            $db->fechar();
            return $new_objeto;
        }
        public function selecionarRegistros( $tb_name, $fields_where, $values_where){  // nome da tabela, vetores: campos(fields), valores(values) da consulta
            $obj = explode('_',$tb_name);
            $qtd = count($fields_where);
            $db = new Banco();
            $conexao = $db->conectaDB();
            //$db->abrir();

            // <Monta a string SQL> =====================
            $sql = "SELECT id_".$obj[1]." FROM ".$tb_name;
            if ($qtd >= 1 ) {
                for ($j=1;$j<=$qtd;$j++){
                    if ($j == 1) { $sql .= ' WHERE '; }//garante que o where entre caso tenha algum parametro
                    $sql .= $fields_where[$j].' = '.$values_where[$j];              
                    if ($j<$qtd )  { $sql .= ' AND '; }
                }
            } //==================== </Monta a string SQL>

            $query = mysqli_query($sql) or die ($sql .mysqli_error());
            $h = 0; // inicializamos a variável
            // Laço que trará TODOS os objetos já alimentados
            while ($linha = mysqli_fetch_array($query)){
                $objDTO = new $obj[1];
                $fields_where[$qtd+1] = 'id_'.$obj[1];
                $values_where[$qtd+1] = $linha[$fields_where[$qtd+1]];
                $fields = mysqli_list_fields($this->nome_db,$tb_name); // informa os fields/campos da tabela do banco
                $columns = mysqli_num_fields($fields); //conta o número de campos
                $new_objeto[$h] = clone $objDTO; //Aqui declaramos um novo objeto que é clone de nosso DAO, no momento sendo apenas um DTO.
                for ($i = 0; $i < $columns; $i++) {
                        $fields_name    = mysqli_field_name($fields, $i);
                        $fields_values = $this->BuscaValor(mysql_field_name($fields, $i),$tb_name,$fields_where,$values_where);
                        $new_objeto[$h]->$fields_name = $fields_values;
                }
                $h += 1; //chamamos o próximo objeto
            } //fecha o while, terminando nosso vetor de objetos.
            $db->fechar();
            return $new_objeto; //retorna todos os objetos populados
        }
} //class
