<?php
/*APLICATIVO GERADOR CRUD ExtJs/Php/Mysql.
 Desenvolvido por AMARILDO DIAS
 dias@dias.adm.br
 http://www.dias.adm.br 
*/
include "./Formulario.php";
include "./ConnDB.php";

$dbname = $_GET['Database'];

$db_selected = mysql_select_db($dbname, $link)or die ('{"success":"false"}');	

if ($link){
	//Retorno JSON
	echo '{"success":"true", 
	"campos": '.json_encode($colun).',
	"fields": '.json_encode($arrField).',
	"columns": '.json_encode($arr_col).',
	"items":'.json_encode($arr_items).'}';

}
else{
	echo '{"success":"false"}';		
}

?>