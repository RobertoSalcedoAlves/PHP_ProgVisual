<?php
/*APLICATIVO GERADOR CRUD ExtJs/Php/Mysql.
 Desenvolvido por AMARILDO DIAS
 dias@dias.adm.br
 http://www.dias.adm.br 
*/
include "./ConnDB.php";

//lista DB
if ($link){
 $arr = array();
 //$db_list = mysql_list_dbs($link);
 $db_list = mysql_query("SHOW DATABASES");
	while ($rowDB = mysql_fetch_assoc($db_list)) {
    	$arr[] = $rowDB;
	}
	echo json_encode($arr);
}
else{
	echo '{"success":"false"}';		
}

?>
