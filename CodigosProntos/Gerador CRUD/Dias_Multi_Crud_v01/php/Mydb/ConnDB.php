<?php
/*APLICATIVO GERADOR CRUD ExtJs/Php/Mysql.
 Desenvolvido por AMARILDO DIAS
 dias@dias.adm.br
 http://www.dias.adm.br 
*/
// Variaveis para conexao MySQL
$server = 'localhost'; 	 // endereco do servidor mysql. Se nao for porta padrao acrescente :porta
$user = 'root';	 // usuario do servidor mysql.
$senha = 'teste';	// senha da conexao mysql.

//A versão 5.2 do PHP tem uma diferenca para tratar os encode/decode
//Coloque a versao do seu php se for 5.3 ou superior deixe como está
$php_ver = 'php5_3'; 

//caminho onde voce instalou o aplicativo. 
//este caminho será utilizado para salvar os crud gerados na pasta modulos.
//se for linux coloque no formato do seu sistema. ex: /home/www/Dias_Multi_Crud_v01
$path = "C:\xampp\htdocs\ProgVisual"; 

// Conecta Mysql
$link = @mysql_connect($server,$user,$senha)or die ('{"success":"false"}');

//mysql_close($link);
?>