<?php
/*APLICATIVO GERADOR CRUD ExtJs/Php/Mysql.
 Desenvolvido por AMARILDO DIAS
 dias@dias.adm.br
 http://www.dias.adm.br 
*/
//Connecta mysql
include "./ConnDB.php";

$dbname = $_POST['Database'];

$db_selected = mysql_select_db($dbname, $link)or die ('{"success":"false"}');	

if ($link){	
	
 $nometabela = $_POST['NomeTabela'];
 
 $sqlid = "CREATE TABLE $nometabela (id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY)"; 
 mysql_query($sqlid);
 
 echo '{"success":"true"}';

}

else{
	echo '{"success":"false"}';		
}

?>