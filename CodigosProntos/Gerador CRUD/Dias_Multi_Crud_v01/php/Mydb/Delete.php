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
include "./Sql.php";
include "./ConnDB.php";

$dbname = $_GET['Database'];
$tablename = $_GET['Tabela'];

$db_selected = mysql_select_db($dbname, $link)or die ('{"success":"false"}');

if ($link){
//Campos e valores da consulta
$campo1 = $_GET['Field1'];
$val1 = $_GET['Val1'];
$cond1 = "=";
//Monta Consulta SQL
$sql = new SqlQuery("delete");
	$sql -> Add("table",$tablename);
	$sql -> Add("where","$campo1 $cond1 '$val1'");	
	mysql_query($sql->toSql()) or die ('{"success":"false"}');	
	echo '{"success":"true"}';
}
else{
	echo '{"success":"false"}';		
}

?>