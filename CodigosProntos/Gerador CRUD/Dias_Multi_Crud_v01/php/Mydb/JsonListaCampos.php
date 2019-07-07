<?php
/*APLICATIVO GERADOR CRUD ExtJs/Php/Mysql.
 Desenvolvido por AMARILDO DIAS
 dias@dias.adm.br
 http://www.dias.adm.br 
*/
include "./ConnDB.php";

$dbname = $_GET['Database'];
$tablename = $_GET['Tabela'];

$db_selected = mysql_select_db($dbname, $link)or die ('{"success":"false"}');	

$arr = array();

$result = mysql_query("SHOW COLUMNS FROM $tablename");

if ($link) {
	
 if ($result){
 	$arr = array();
	if (mysql_num_rows($result) > 0) {
    	while ($row = mysql_fetch_assoc($result)) {
    		$config=array(
    		'Controle'=>'textfield', 
    		'Tamanho'=>'400', 
    		'Rotulo' => $row['Field'], 
    		'Storecb'=>'', 
    		'Validacao'=>'', 
    		'Plugin'=>'', 
    		'Invisivel'=>false, 
    		'Nulo'=>true,
    		'Maximo'=>'1024',
    		'SoLeitura'=>false);
    		$arr[] = ($row+$config);
    	}
	}
 }
 echo '{"success":"true", "config": '.json_encode($arr).'}';	
}

else {
	echo '{"success":"false"}';
}

?>