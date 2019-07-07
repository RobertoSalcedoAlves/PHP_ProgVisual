<?php
/*APLICATIVO GERADOR CRUD ExtJs/Php/Mysql.
 Desenvolvido por AMARILDO DIAS
 dias@dias.adm.br
 http://www.dias.adm.br 
*/

include "./Formulario.php";
	//grava configuracoes individuais para cada tablela do modulo_crud no arquivo nome_tabela.json
	$jsontab = fopen("$path/modulos/$dbname/php/json/".$tablename.".json", "w+");
	$datajson = json_encode(array(
			"success" => "true",
			"dbname" => $dbname,
			"tablename" => $tablename,
			"chave" => $campo0,
			"fields" => $colun,
			"columns" => $arr_col,
			"items" => $arr_items
		));
	fwrite($jsontab, $datajson);
	
	//retorna nome do banco de dados para criar o atalho
echo $dbname;	

?>