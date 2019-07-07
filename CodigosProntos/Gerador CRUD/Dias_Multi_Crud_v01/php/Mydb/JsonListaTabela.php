<?php
/*APLICATIVO GERADOR CRUD ExtJs/Php/Mysql.
 Desenvolvido por AMARILDO DIAS
 dias@dias.adm.br
 http://www.dias.adm.br 
*/
//Connecta mysql
include "./ConnDB.php";

$dbname = $_GET['Database'];

$db_selected = mysql_select_db($dbname, $link)or die ('{"success":"false"}');	

//lista Tabelas
$arr = array();
$sql = "SHOW TABLES FROM $dbname";
$result = mysql_query($sql);
if ($result){
	while ($rowTable = mysql_fetch_array($result)) {
     	$arr[] = $rowTable;
	}
	echo json_encode($arr);
}
else {
	echo '{"success":"false"}';
}

?>
