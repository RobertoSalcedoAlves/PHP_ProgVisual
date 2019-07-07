<?php
/*
 APLICATIVO GERADOR CRUD ExtJs/Php/Mysql.
 Desenvolvido por AMARILDO DIAS
 dias@dias.adm.br
 http://www.dias.adm.br 
 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, version 3.
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.
 <http://www.gnu.org/licenses/>.
*/
include "./Sql.php";
include "./ConnDB.php";

$dbname = $_GET['Database'];

$db_selected = mysql_select_db($dbname, $link)or die ('{"success":"false"}');	

if ($link){
//Colunas da GRID e Campos Form
$dbase = $_GET['Dbase'];
$dbasex = $_GET['Dbasex'];
$tablename = $_GET['Tabela'];
$colunas = $_GET['Colunas'];
$controle = $_GET['Controle'];
$rotulo = $_GET['Rotulo'];
$storecb = $_GET['Storecb'];
$validacao = $_GET['Validacao'];
$tamanho = $_GET['Tamanho'];
$plug = $_GET['Plugin'];
$invisivel = $_GET['Invisivel'];
$nulo = $_GET['Nulo'];
$soLeitura = $_GET['SoLeitura'];
$maximo = $_GET['Maximo'];
//Valores para os filtros
$campo0 = $_GET['Field0'];
$campo1 = $_GET['Field1'];
$campo5 = $_GET['Field5'];
$cond1 = $_GET['Cond1'];
$cond5 = $_GET['Cond5'];
$val1 = $_GET['Valor1'];
$val5 = $_GET['Valor5'];
$order = $_GET['Order'];

//Monta Consulta SQL
$sql = new SqlQuery("select");

if (isset($colunas)){
	if ($php_ver == "php5_3"){
		$colun = json_decode($colunas);
	}
	else {
		$c = json_decode(stripslashes(json_encode($colunas)));
		$colun = json_decode($c);
	} 
	foreach ($colun as $value) {
   		$sql -> Add("col", $value);
	}
}
else {
	$sql -> Add("col",$campo0);
}	

$sql -> Add("table",$tablename);
	
	if ($val1<>""){
		$sql -> Add("where","$campo1 $cond1 '$val1'");
	};
	if ($val5<>""){
		$sql -> Add("where","$campo5 $cond5 '$val5'");
	};
	
$sql -> Add("orderby",$order);
	
	//Montando retorno json para form
	$query = $sql->toSql();
	$text = "text";	
	$dataIndex = "dataIndex";
	$flex = "flex";
	$xtype = "xtype";
	$name = "name";
	$id = "id";
	$fieldLabel = "fieldLabel";
	$store = "store";
	$vtype = "vtype";
	$width = "width";
	$hidden = "hidden";
	$plugin = "plugins";
	$allowBlank = "allowBlank";
	$maxLength = "maxLength";
	$readOnly = "readOnly";
	$arr_items = array();
	$arr_col = array();
	$result = mysql_query($query);
	$ncampos = mysql_num_fields($result);
	
	//Contando total de registros da tabela
	$count = mysql_query("SELECT COUNT($campo0) FROM $tablename");
	$rowCount = mysql_fetch_array($count);
	$total_count = $rowCount[0]; 
	
	//Lista Todos os campos da tabela
	$arrField = array();
	$resultField = mysql_query("SHOW COLUMNS FROM $tablename");
	while ($rowField = mysql_fetch_assoc($resultField)) {
        $arrField[] = ($rowField);
    }
    
    //Lista campos escolhidos para GRID e Formulario
	for( $y=0; $y<$ncampos; $y++){
		$campo=mysql_field_name($result,$y);
		$campo1=array($text=>$campo, $dataIndex=>$campo, $flex=>"1");
		$arr_col[] = ($campo1);
	}
		
	//Propriedades dos campos escolhidos para o Formulario
	if ($php_ver == "php5_3"){	
		$dbs = json_decode($dbase);
		$dbsx = json_decode($dbasex);
		$contr = json_decode($controle);
		$rot = json_decode($rotulo);
		$stcb = json_decode($storecb);
		$valid = json_decode($validacao);
		$tam = json_decode($tamanho);
		$msk = json_decode($plug);
		$vis = json_decode($invisivel);
		$nul = json_decode($nulo);
		$sole = json_decode($soLeitura);
		$max = json_decode($maximo);}
	else{
		$bs = json_decode(stripslashes(json_encode($dbase)));
		$dbs = json_decode($bs);
		$bsx = json_decode(stripslashes(json_encode($dbasex)));
		$dbsx = json_decode($bsx);		
		$co = json_decode(stripslashes(json_encode($controle)));
		$contr = json_decode($co);
		$ro = json_decode(stripslashes(json_encode($rotulo)));
		$rot = json_decode($ro);
		$st = json_decode(stripslashes(json_encode($storecb)));
		$stcb = json_decode($st);
		$va = json_decode(stripslashes(json_encode($validacao)));
		$valid = json_decode($va);
		$ta = json_decode(stripslashes(json_encode($tamanho)));
		$tam = json_decode($ta);
		$mk = json_decode(stripslashes(json_encode($plug)));
		$msk = json_decode($mk);
		$vs = json_decode(stripslashes(json_encode($invisivel)));
		$vis = json_decode($vs);
		$nu = json_decode(stripslashes(json_encode($nulo)));
		$nul = json_decode($nu);
		$soleit = json_decode(stripslashes(json_encode($soLeitura)));
		$sole = json_decode($soleit);
		$maxi = json_decode(stripslashes(json_encode($maximo)));
		$max = json_decode($maxi);
	}
	for( $y=0; $y<$ncampos; $y++){
		$campo=mysql_field_name($result,$y);
		$ctrl=$contr[$y];
		$rotu=$rot[$y];
		$stc=json_decode($stcb[$y]);
		$val=$valid[$y];
		$tama=$tam[$y];
		$ms=$msk[$y];
		$visi=$vis[$y];
		$nl=$nul[$y];
		$sl=$sole[$y];
		$mx=$max[$y];
		$items1=array(
			$xtype=>$ctrl, 
			$name=>$campo, 
			$id=>$campo,
			//$plugin=>array($ms), //str_replace("\"","",$ms)
			$hidden=>$visi, 
			$allowBlank=>$nl,
			$maxLength=>(int)$mx, 
			$fieldLabel=>$rotu, 
			$vtype=>$val, 
			$width=>(int)$tama,
			$readOnly=>$sl
		);		
		$items2=array($store=>$stc);
		$items3=array($plugin=>$ms);
		$arr_items[] = ($items1+$items3+$items2);
	}
}
else{
	echo '{"success":"false"}';		
}
?>