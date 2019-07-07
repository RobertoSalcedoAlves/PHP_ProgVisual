<?php
/*APLICATIVO GERADOR CRUD ExtJs/Php/Mysql.
 Desenvolvido por AMARILDO DIAS
 dias@dias.adm.br
 http://www.dias.adm.br
 
*/

include "./Config.php";
//conecta
$link = @mysql_connect($local_server,$usuario_server,$senha_server)or die ('{"success":"false"}');
//Seleciona DB
mysql_select_db($dbname, $link)or die ('{"success":"false"}');

//Gera json
if ($link){	
	 $tablename = $_POST['Tablename'];
	 $chave = $_POST['Chave'];
	 $campo1 = $_POST['Field1'];
	 $val1 = $_POST['Val1'];
	 $cond1 = "=";
	 $campos = array();
	 $valores = array();
	 $campos = $_POST['Fields'];
	 $valores = $_POST['Valores'];
	 $length = $_POST['Length'];
	
	 //Monta Consulta SQL
	 $sql = new SqlQuery(); 
	 if ($php_ver == "php5_3"){	 
	 	$camp = json_decode($campos);
	 	$valo = json_decode($valores);	 	
	 }
	 else{	 	
	 	$ca = json_decode(stripslashes(json_encode($campos)));
	 	$camp = json_decode($ca); 
	 	$va = json_decode(stripslashes(json_encode($valores)));
	 	$valo = json_decode($va);
	 }
	 if ($campo1<>""){	
		foreach ($camp as $value) {
	   	 $sql -> Add("col",$value);
		}
		foreach ($valo as $val) {
	     $sql -> Add("value","'$val'");
		} 
	 };
 	 $sql -> Add("table",$tablename);	
	 mysql_query($sql->toSql()) or die ('{"success":"false"}');	
	 echo '{"success":"true"}';
}
else{
	echo '{"success":"false"}';		
}	
?>

<?php
class SqlQuery {
		var $Fields = array ("col", "table", "value");
		var $Sql = array();
		function Add($method,$param){
			if(in_array(strtolower($method),$this->Fields)) 
			{
			$this->Sql[$method][] = $param;
			}
		}
		function toSql() {	
			if (!($this->Sql["table"])) {
				return FALSE;
			}	
			$query = FALSE;	
			$query = "INSERT INTO ".implode($this->Sql["table"], ", ");
			if (isset ($this->Sql["col"])) {
				if (count($this->Sql["col"]) != count($this->Sql["value"]))
					genError ("INSERT: Nao foi possivel execuar a operacao.", 1);
				$query .= " (".implode($this->Sql["col"], ", ").")";
			}
			$query .= " VALUES (".implode($this->Sql["value"], ",").")";
		return $query;
	  }
  }
?>