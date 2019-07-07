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
include "./Sql.php";
include "./ConnDB.php";

$dbname = $_POST['Database'];
$tablename = $_POST['Tabela'];

$db_selected = mysql_select_db($dbname, $link)or die ('{"success":"false"}');	

if ($link){	
	
 $campo1 = $_POST['Field1'];
 $val1 = $_POST['Val1'];
 $cond1 = "=";
 $campos = array();
 $valores = array();
 $campos = $_POST['Fields'];
 $valores = $_POST['Valores'];
 $length = $_POST['Length'];

 //Monta Consulta SQL
 $sql = new SqlQuery("insert");
 
 if ($php_ver == "php5_3"){ 
 	$camp = json_decode($campos); 
 	$valo = json_decode($valores);
 }
 else { 	
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
     $sql -> Add("value","'$val'");
	} 
 };
	$sql -> Add("table",$tablename);
	
	mysql_query($sql->toSql()) or die ('{"success":"false"}');
	
	echo '{"success":"true"}';
	//echo '{"sql" : '.json_encode($sql->toSql()).'}';
}
else{
	echo '{"success":"false"}';		
}

?>