<?php
//Classe Geradora de Consulta SQL
class SqlQuery
	{
		/** @var access attributes query */
		var $Fields = array ("col", "table", "where", "groupby", "having", "orderby", "value", "campos", "limit");
		/** @var array of attributes query */
		var $Sql = array();
		/** @var type of sql query */
		var $typeQuery = "select";		
		
		/**
		* define type of SQL query
		* @param string $typeQuery - select, insert, update, delete
		*/
		function SqlQuery($typeQuery)
		{
		  $this->typeQuery = $typeQuery;
		}
		
		function Add($method,$param)
		{
			if(in_array(strtolower($method),$this->Fields)) 
			{
				$this->Sql[$method][] = $param;
			}
		}
		
		/**
		* multi condition where
		* @param string $column col in table
		* @param array $values value array 
		* @param boolean $possitive if FALSE => NOT
		*/
		function addWhereMulti($column, $values, $possitive = TRUE) {
	
			foreach ($values as $value)
				$where[] = "$column = '$value'";
	
			$sqlWhere = implode($where, " OR ");
			if (!$possitive)
				$sqlWhere = "NOT (".$sqlWhere.") OR $column IS NULL";;
	
			$this->addWhere($sqlWhere);
	
		}
	    /**
		* make sql query
		* @return string sql query
		*/
		function toSql() {
	
			if (!($this->Sql["table"])) {
				// genError("", 1);
				return FALSE;
			}
	
			$query = FALSE;
	
			switch ($this->typeQuery) {
	
				// SELECT
				case ("select") :	
					if (!($this->Sql["col"])) break;
					$query = "SELECT `".implode($this->Sql["col"], "`, `")."` FROM ".implode($this->Sql["table"], " ");
					if (isset ($this->Sql["where"]))
						$query .= " WHERE (".implode($this->Sql["where"], ") AND (").")";
					if (isset ($this->Sql["groupby"]))
						$query .= " GROUP BY ".implode($this->Sql["groupby"], ", ");
					if (isset ($this->Sql["having"]))
						$query .= " HAVING ".implode($this->Sql["having"], " AND ");
					if (isset ($this->Sql["orderby"]))
						$query .= " ORDER BY ".implode($this->Sql["orderby"], ", ");
					if (isset ($this->Sql["limit"]))
						$query .= " LIMIT ".implode($this->Sql["limit"], ", ");
					break;
					
				// SELECT ALL
				case ("selectAll") :	
					if (!($this->Sql["col"])) break;
					$query = "SELECT ".implode($this->Sql["col"], ", ")." FROM ".implode($this->Sql["table"], " ");
					if (isset ($this->Sql["where"]))
						$query .= " WHERE (".implode($this->Sql["where"], ") AND (").")";
					if (isset ($this->Sql["groupby"]))
						$query .= " GROUP BY ".implode($this->Sql["groupby"], ", ");
					if (isset ($this->Sql["having"]))
						$query .= " HAVING ".implode($this->Sql["having"], " AND ");
					if (isset ($this->Sql["orderby"]))
						$query .= " ORDER BY ".implode($this->Sql["orderby"], ", ");
					break;	
	
				// INSERT
				case ("insert") :	
					if (empty($this->Sql["value"])) break;
	
					$query = "INSERT INTO ".implode($this->Sql["table"], ", ");
					// 
					if (isset ($this->Sql["col"])) {
						if (count($this->Sql["col"]) != count($this->Sql["value"]))
							genError ("INSERT: Nao foi possivel execuar a operacao.", 1);
						$query .= " (".implode($this->Sql["col"], ", ").")";
					}
					$query .= " VALUES (".implode($this->Sql["value"], ",").")";
					break;
	
				// UPDATE
				case ("update") :	
					if (empty($this->Sql["col"]) || empty($this->Sql["value"]))
						break;
	
					$query = "UPDATE ".implode($this->Sql["table"], ", ");
					// 
					if (count($this->Sql["col"]) != count($this->Sql["value"]))
						genError ("UPDATE: Nao foi possivel execuar a operacao.", 1);
					// 
					for ($i=0; $i<count($this->Sql["col"]); $i++) {
						$temp[] = $this->Sql["col"][$i]." = '".$this->Sql["value"][$i];
					}
	
					$query .= " SET ".implode($temp, "', ");
					if (isset ($this->Sql["where"]))
						$query .= "' WHERE ".implode($this->Sql["where"], ") AND (");
					break;
	
				// DELETE
				case ("delete") :	
					$query = "DELETE FROM ".implode($this->Sql["table"], ", ");
					if (isset ($this->Sql["where"]))
						$query .= " WHERE (".implode($this->Sql["where"], ") AND (").")";
					break;
					
				// ALTERTABLE
				case ("altertable") :	
					$query = "ALTER TABLE ".implode($this->Sql["table"], ", ");
					if (isset ($this->Sql["campos"]))
						$query .= " ADD ".implode($this->Sql["campos"], " ADD ")." ";
					break;
					
	
				default:
					genError ("Invalid type of query - $this->typeQuery.", 1);
					return FALSE;
			}
			return $query;
	
		}
			 
	}	// end of class
	
?>	