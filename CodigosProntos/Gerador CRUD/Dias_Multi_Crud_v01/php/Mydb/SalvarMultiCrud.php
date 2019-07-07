<?php
/*APLICATIVO GERADOR CRUD ExtJs/Php/Mysql.
 Desenvolvido por AMARILDO DIAS
 dias@dias.adm.br
 http://www.dias.adm.br 
*/
include "./Formulario.php";

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
copyr(''.$path.'/template/crud_99999', ''.$path.'/modulos/'.$dbname.''); 

// Copia a pasta do extjs para a pasta modulos para ser usado pelos cruds gerados
if (!is_dir($path.'/modulos/'.$dbname.'/extjs')) {
     copyr(''.$path.'/extjs', ''.$path.'/modulos/'.$dbname.'/extjs/');
}
	
//grava um arquivo com nome Config.php com as configuracoes da conexao	
$config = fopen("$path/modulos/$dbname/php/Config.php", "w+");
$conf = '
<?php
//Conexao Mysql
$php_ver = "'.$php_ver.'";  //sua versão do php: se for 5.3 ou maior deixe como esta, altere somente se for menor que 5.3
$local_server = "'.$server.'"; //seu servidor
$usuario_server = "'.$user.'"; //seu usuario
$senha_server = "'.$senha.'"; //sua senha
$dbname = "'.$dbname.'"; //seu db
?>';
fwrite($config, $conf);
	
//Grava arquivo base com nome das tabelas do modulo_crud no arquivo base.json
$json = fopen("$path/modulos/$dbname/php/json/base.json", "w+");
$bsjson = json_encode(array(
			"success" => "true",
			"base" => $dbsx,
		));
fwrite($json, $bsjson);

?>