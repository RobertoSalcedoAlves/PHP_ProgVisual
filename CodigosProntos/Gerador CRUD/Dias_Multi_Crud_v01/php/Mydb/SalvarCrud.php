<?php
/*APLICATIVO GERADOR CRUD ExtJs/Php/Mysql.
 Desenvolvido por AMARILDO DIAS
 dias@dias.adm.br
 http://www.dias.adm.br 
*/
include "./Formulario.php";

$nr_rand = rand(0, 99999);

//FUNCAO PARA COPIAR DIRETORIO
function copyr($source, $dest){
   	if (is_file($source)) {
   		return copy($source, $dest);
   	} 
   	if (!is_dir($dest)) {
   		mkdir($dest, 0777);
   	} 
   	$dir = dir($source);
   	while (false !== $entry = $dir->read()) {
      	if ($entry == '.' || $entry == '..') {
     		 continue;
     	} 
     	if ($dest !== "$source/$entry") {
    		 copyr("$source/$entry", "$dest/$entry");
    	}
   	} 
   	$dir->close();
   	return true; 
}	
//copia template
copyr(''.$path.'/template/crud_99999', ''.$path.'/modulos/crud_'.$nr_rand.''); 
	
//grava um arquivo com nome Config.php com as configuracoes da conexao	
$config = fopen("$path/modulos/crud_".$nr_rand."/php/Config.php", "w+");
$conf = '
<?php
//Conexao Mysql
$php_ver = "php5_3";  //sua versão do seu php: se for 5.3 ou maior deixe como esta, altere somente se for menor que 5.3
$local_server = "'.$server.'"; //seu servidor
$usuario_server = "'.$user.'"; //seu usuario
$senha_server = "'.$senha.'"; //sua senha
$dbname = "'.$dbname.'"; //seu db

//colunas da grid e campos do formulario que foram escolhidos no Gerador Crud -> NAO ALTERE.
$colunas = \''.$colunas.'\';	
	
?>';
fwrite($config, $conf);

//cria o arquivo de configuracao .json para cada tabela
//gava configuracoes do modulo_crud neste arquivo
$json = fopen("$path/modulos/".$dbname."_".$nr_rand."/php/json/".$tablename.".json", "w+");
$txjson = json_encode(array(
			"success" => "true",
			"dbname" => $dbname,
			"tablename" => $tablename,
			"chave" => $campo0,
			"fields" => $colun,
			"columns" => $arr_col,
			"items" => $arr_items
		));
fwrite($json, $txjson);
	
echo "$dbname"."_"."$nr_rand";		

?>