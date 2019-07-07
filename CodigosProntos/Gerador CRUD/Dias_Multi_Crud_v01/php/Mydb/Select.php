<?php
/*APLICATIVO GERADOR CRUD ExtJs/Php/Mysql.
 Desenvolvido por AMARILDO DIAS
 dias@dias.adm.br
 http://www.dias.adm.br 
*/
include "./Sql.php";
include "./ConnDB.php";

$dbname = $_GET['Database'];
$tablename = $_GET['Tabela'];

$db_selected = mysql_select_db($dbname, $link)or die ('{"success":"false"}');	

if ($link){
//Campos da consulta
$colunas = $_GET['Colunas'];
//Valores para os filtros
$campo0 = $_GET['Field0'];
$campo1 = $_GET['Field1'];
$campo5 = $_GET['Field5'];
$cond1 = $_GET['Cond1'];
$cond5 = $_GET['Cond5'];
$val1 = $_GET['Valor1'];
$val5 = $_GET['Valor5'];
$order = $_GET['Order'];

//Limitando quantidade de registros retornados
$start = $_GET['start'];;
$limit = $_GET['limit'];;
$lim = "$start, $limit";

//Monta Consulta SQL
$sql = new SqlQuery("select");

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
else {
	$sql -> Add("col",$campo0);
}
$sql -> Add("table",$tablename);	
	if ($val1<>""){
		$sql -> Add("where","$campo1 $cond1 '$val1'");
	};
	if ($val5<>""){
		$sql -> Add("where","$campo5 $cond5 '$val5'");
	};	
$sql -> Add("orderby",$order);
$queryTotal = $sql->toSql();
$sql -> Add("limit",$lim);
	
	//Montando retorno json para Extjs
	$query = $sql->toSql();
	$arr_data = array();
	$result = mysql_query($query);
	$ncampos = mysql_num_fields($result);
	
	//Contando total da cosulta sem o limite
	$resultTotal = mysql_query($queryTotal);
	$num_rows = mysql_num_rows($resultTotal);
	
	//Contando total de registros da tabela
	$count = mysql_query("SELECT COUNT($campo0) FROM $tablename");
	$rowCount = mysql_fetch_array($count);
	$total_count = $rowCount[0]; 
	
	//Dados retornados da consulta
	while ($row = mysql_fetch_assoc($result)) {
		$arr_data[] = ($row);	
	}

	//Retorno JSON
	echo '{"success":"true", 
	"dbname":"'.$dbname.'", 
	"tablename":"'.$tablename.'",
	"chave":"'.$campo0.'", 
	"total": '.$num_rows.', 
	"dados":'.json_encode($arr_data).'}';

}
else{
	echo '{"success":"false"}';		
}

?>