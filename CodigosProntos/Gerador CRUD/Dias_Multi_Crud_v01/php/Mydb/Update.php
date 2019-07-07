<?php
/*APLICATIVO GERADOR CRUD ExtJs/Php/Mysql.
 Desenvolvido por AMARILDO DIAS
 dias@dias.adm.br
 http://www.dias.adm.br 
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
 $sql = new SqlQuery("update");
 
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