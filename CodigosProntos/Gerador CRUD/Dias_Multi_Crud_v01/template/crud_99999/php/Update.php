<?php
/* 
 APLICATIVO GERADOR CRUD ExtJs/Php/Mysql.
 Desenvolvido por AMARILDO DIAS
 dias@dias.adm.br
 http://www.dias.adm.br 
 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, version 3.
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.
 <http://www.gnu.org/licenses/>.
*/
include "./Config.php";
//conecta
$link = @mysql_connect($local_server,$usuario_server,$senha_server)or die ('{"success":"false"}');
//Seleciona DB
mysql_select_db($dbname, $link)or die ('{"success":"false"}');	

//Gera json
if ($link){	
	$tablename = $_POST['Tablename'];
	$chave = $_POST['Chave'];	
 	$campo1 = $_POST['Field1'];
 	$val1 = $_POST['Val1'];
 	$cond1 = "=";
 	$campos = array();
 	$valores = array();
 	$campos = $_POST['Fields'];
 	$valores = $_POST['Valores'];
 	$length = $_POST['Length'];
 	//Monta Consulta SQL
 	$sql = new SqlQuery(); 
	if ($php_ver == "php5_3"){	
	 	$camp = json_decode($campos);
	 	$valo = json_decode($valores);	 
	}
	else{		
	 	$ca = json_decode(stripslashes(json_encode($campos)));
	 	$camp = json_decode($ca); 
	 	$va = json_decode(stripslashes(json_encode($valores)));
	 	$valo = json_decode($va);
	}
 	if ($campo1<>""){	
		foreach ($camp as $value) {
   	 		$sql -> Add("col",$value);
		}
		foreach ($valo as $val) {
     		$sql -> Add("value",$val);
		} 
 	};
	$sql -> Add("table",$tablename);
	$sql -> Add("where","$campo1 $cond1 '$val1'");
	
	mysql_query($sql->toSql()) or die ('{"success":"false"}');
	
	echo '{"success":"true"}';
}
else{
	echo '{"success":"false"}';		
}
?>

<?php
class SqlQuery {
		var $Fields = array ("col", "table", "where", "value");
		var $Sql = array();
		function Add($method,$param){
			if(in_array(strtolower($method),$this->Fields)) 
			{
			$this->Sql[$method][] = $param;
			}
		}
		function addWhereMulti($column, $values, $possitive = TRUE) {	
			foreach ($values as $value)
				$where[] = "$column = '$value'";	
				$sqlWhere = implode($where, " OR ");
			if (!$possitive)
				$sqlWhere = "NOT (".$sqlWhere.") OR $column IS NULL";;	
			$this->addWhere($sqlWhere);	
		}
		function toSql() {	
			if (!($this->Sql["table"])) {
				return FALSE;
			}	
			$query = FALSE;	
			if (empty($this->Sql["col"]) || empty($this->Sql["value"]));
				$query = "UPDATE ".implode($this->Sql["table"], ", ");
				if (count($this->Sql["col"]) != count($this->Sql["value"]))
					genError ("UPDATE: Nao foi possivel executar a operacao.", 1);
				for ($i=0; $i<count($this->Sql["col"]); $i++) {
					$temp[] = $this->Sql["col"][$i]." = '".$this->Sql["value"][$i];
				}
				$query .= " SET ".implode($temp, "', ");
				if (isset ($this->Sql["where"]))
					$query .= "' WHERE ".implode($this->Sql["where"], ") AND (");
			return $query;
	  }
  }
?>