<?php
/*APLICATIVO GERADOR CRUD ExtJs/Php/Mysql.
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
//Varariaveis do filtro
$campo1 = $_GET['Field1'];
$cond1 = $_GET['Cond1'];
$val1 = $_GET['Valor1'];
$tablename = $_GET['Tablename'];
$chave = $_GET['Chave'];
$colunas = $_GET['Campos'];

//Limitando quantidade de registros retornados
$start = $_GET['start'];;
$limit = $_GET['limit'];;
$lim = "$start, $limit";

//Monta cunsulta SQL
$sql = new SqlQuery();
if (isset($colunas)){
	if ($php_ver == "php5_3"){	
		$colun = json_decode($colunas);
	}
	else {		
		$c = json_decode(stripslashes(json_encode($colunas)));
		$colun = json_decode($c);
	} 
	foreach ($colun as $value) {
   		$sql -> Add("col", $value);
	}
}
$sql -> Add("table",$tablename);	
	if ($val1<>""){
		$sql -> Add("where","$campo1 $cond1 '$val1'");
	};	
$sql -> Add("orderby",$campo1);

$query = $sql->toSql();

$queryTotal = $sql->toSql();

$sql -> Add("limit",$lim);

$queryLim = $sql->toSql();

//Gera json
if ($link){
	//Query com limite
	$result = mysql_query($queryLim);
	$ncampos = mysql_num_fields($result);
	
	//Contando total da cosulta sem o limite
	$resultTotal = mysql_query($queryTotal);
	$num_rows = mysql_num_rows($resultTotal);
	
	//Dados retornados da consulta
	$arr_data = array();
	while ($row = mysql_fetch_assoc($result)) {
		$arr_data[] = ($row);	
	}	
	//Retorno JSON
	//echo $json; 
	echo '{"success":"true", 
	"server":"'.$local_server.'",
	"total": '.$num_rows.',
	"dbname":"'.$dbname.'", 
	"tablename":"'.$tablename.'",
	"chave":"'.$chave.'",
	"dados":'.json_encode($arr_data).'}';
}
else{
	echo '{"success":"false"}';		
}
?>


<?php
class SqlQuery {
		var $Fields = array ("col", "table", "where", "value", "limit");
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
					$query = "SELECT `".implode($this->Sql["col"], "`, `")."` FROM ".implode($this->Sql["table"], " ");
				if (isset ($this->Sql["where"]))
					$query .= " WHERE (".implode($this->Sql["where"], ") AND (").")";
				if (isset ($this->Sql["orderby"]))
					$query .= " ORDER BY ".implode($this->Sql["orderby"], ", ");
				if (isset ($this->Sql["limit"]))
					$query .= " LIMIT ".implode($this->Sql["limit"], ", ");
			return $query;
	  }
  }
?>