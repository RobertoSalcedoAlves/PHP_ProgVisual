<?php
/*APLICATIVO GERADOR CRUD ExtJs/Php/Mysql.
 Desenvolvido por AMARILDO DIAS
 dias@dias.adm.br
 http://www.dias.adm.br 
*/
include "./Config.php";
//conecta
$link = @mysql_connect($local_server,$usuario_server,$senha_server)or die ('{"success":"false"}');
//Seleciona DB
mysql_select_db($dbname, $link)or die ('{"success":"false"}');

$tablename = $_GET['Tablename'];
$chave = $_GET['Chave'];

//Gera json
if ($link){
//Campos e valores da consulta
$campo1 = $_GET['Field1'];
$val1 = $_GET['Val1'];

//Consulta SQL
mysql_query("DELETE FROM $tablename WHERE ($campo1 = '$val1')") or die ('{"success":"false"}');	
	echo '{"success":"true"}';
}
else{
	echo '{"success":"false"}';		
}

?>