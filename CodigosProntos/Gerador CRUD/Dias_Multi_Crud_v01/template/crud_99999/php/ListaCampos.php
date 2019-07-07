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

$arr = array();

$result = mysql_query("SHOW COLUMNS FROM $tablename");

//Lista Campos
if ($link) {	
 if ($result){
	if (mysql_num_rows($result) > 0) {
    	while ($row = mysql_fetch_assoc($result)) {
    		$arr[] = ($row);
    	}
	}
 }	
 echo json_encode($arr);	
}
else {
	echo '{"success":"false"}';
}
?>