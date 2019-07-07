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
//Campos e valores da consulta
$tabela = $_POST['Tabela'];
$campo = $_POST['Campo'];
$type = $_POST['Type'];
$nulo = $_POST['Nulo'];
$ncampos = $_POST['Length'];

//Monta Consulta SQL
$sql = new SqlQuery("altertable");
if ($php_ver == "php5_3"){	
	$camp = json_decode($campo); 
	$typ = json_decode($type);
	$n = json_decode($nulo);
}
else{
	$ca = json_decode(stripslashes(json_encode($campo)));
	$camp = json_decode($ca); 
	$ty = json_decode(stripslashes(json_encode($type)));
	$typ = json_decode($ty);
	$nul = json_decode(stripslashes(json_encode($nulo)));
	$n = json_decode($nul);
}

$arr = array();
$result = mysql_query("SHOW COLUMNS FROM $tabela");
while ($row = mysql_fetch_assoc($result)) {
	$arr[] = $row['Field'];
}

$cp_diff = array_diff($camp, $arr);
$num_diff = sizeof(array_diff($camp, $arr));
$j = 0;

$sql -> Add("table","`$tabela`");

for($y=0; $y<$ncampos; $y++){
  	$cp=$camp[$y];
	$tp=$typ[$y];
	$nl=$n[$y];
	if ($nl == "YES") {
		$nl="NULL";
	}else {
		$nl="NOT NULL";
	}	
	$cmp_diff=$cp_diff[$j];	
    if ($cp == $cmp_diff){
    	if ($num_diff == 1){
    		$sql -> Add("campos", "`$cp` $tp $nl");    		
    	}else{
     		if($y+1 <> $ncampos){ 
	  			$sql -> Add("campos", "`$cp` $tp $nl,");
	  		}else{
				$sql -> Add("campos", "`$cp` $tp $nl");
	  		}
    	}
    }else{    	
    //se os campos já existirem altera.
    }
    $j++;
}

mysql_query($sql->toSql()) or die ('{"success":"false"}');

echo json_encode($sql->toSql());

}
else{
	echo '{"success":"false"}';		
}

?>