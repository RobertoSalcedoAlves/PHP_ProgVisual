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
   
//OPERACOES COM TABELAS

Ext.define('DIAS.view.MyTab', {
    extend: 'DIAS.view.layout.MyViewport',
    
  
    carregaCamposTab: function(){ 
    	var dbname = Ext.ComponentQuery.query('#databasetab')[0].getValue();
        var tablename = Ext.ComponentQuery.query('#tabelastab')[0].getValue();           
      	var comboCampos = Ext.ComponentQuery.query('#panelGrid')[0].items.items[0].items.items[0];
      	var cpchave = Ext.ComponentQuery.query('#panelGrid')[0].items.items[0].items.items[0];
      	cpchave.clearValue();
        comboCampos.clearValue();
        comboCampos.store.removeAll();
        comboCampos.store.load({params: { Database: dbname, Tabela: tablename}});
        cpchave.getStore().load({params: { Database: dbname, Tabela: tablename}});
        Ext.ComponentQuery.query('#connPanel')[0].setTitle('Conectado ao Servidor: local | DB: '+dbname+'  | Tabela: '+tablename+'');
   		Ext.ComponentQuery.query('#gridedittabelas')[0].setTitle('Editando a tabela :  '+tablename+'' );
   		save = true; 
    }, 
    
    criaTabelas: function(){
    	var dbname = Ext.ComponentQuery.query('#databasetab')[0].getValue();
     	var banco = Ext.ComponentQuery.query('#databasetab')[0].getValue();
    	if (!banco) {
    		Ext.Msg.alert('Atencao', 'Voce deve escolher um banco de dados');
     	}
    	else{
    		var comboTabelas = Ext.ComponentQuery.query('#tabelastab')[0];
        	comboTabelas.reset();
        	comboTabelas.store.removeAll();
        	comboTabelas.store.load({params: {Database: dbname}});
        	Ext.ComponentQuery.query('#tbpanel')[0].show();
    		Ext.ComponentQuery.query('#tabelastab')[0].reset();
    		Ext.ComponentQuery.query('#paneledittab')[0].show();
    		Ext.ComponentQuery.query('#formcriatabelas')[0].show();
    		Ext.ComponentQuery.query('#editartabelahtml')[0].hide();
    		Ext.ComponentQuery.query('#criartabelahtml')[0].show();
    		Ext.ComponentQuery.query('#gridedittabelas')[0].hide();
    		Ext.ComponentQuery.query('#formcriatabelas')[0].setTitle('Criando uma tabela no DB:  '+dbname+'' );
    		Ext.ComponentQuery.query('#connPanel')[0].setTitle('Conectado ao Servidor: local | DB: '+dbname+'');
    		save = true; 
    	}
    },
    
    mostraGridCriarTabela: function(){
    	var dbname = Ext.ComponentQuery.query('#databasetab')[0].getValue();
    	var nometabela = Ext.ComponentQuery.query('#formcriatabelas')[0].items.items[0].getValue();
     	Ext.Ajax.request({
			 url: 'php/Mydb/CriaTabela.php',
			 method: 'POST',
			 params: {
			 	Database: dbname,
			 	NomeTabela: nometabela 
			 },
			 success: function(){
				this.carregaTabelas();
				Ext.ComponentQuery.query('#formcriatabelas')[0].hide();
				Ext.Msg.alert('Tabela Criada com sucesso', 'Foi criada a tabela : '+nometabela+  ' Foi adicionado o campo ' +
						'["id", tamanho(11), "auto_increment", "chave primaria"]  Para adicionar mais campos clique em ' +
						'"adicionar campos" ou para editar os campos da tabela, clique nas celulas da grid');
				Ext.ComponentQuery.query('#listaDBtab')[0].items.items[1].setValue(nometabela);
				this.carregaCampos();
				this.editTabelas();
   			 },
			 failure: function(){
				Ext.Msg.alert('Erro', 'A operacao falhou');
			 },
			 scope: this
    	})
    },   
    editTabelas: function(){
    	novocamponr = 1;
    	var tablename = Ext.ComponentQuery.query('#tabelastab')[0].getValue();    
    	var grid = Ext.ComponentQuery.query('#gridedittabelas')[0];
    	var tabela = Ext.ComponentQuery.query('#listaDBtab')[0].items.items[1].getValue();
    	if (!tabela) {
    		Ext.Msg.alert('Atencao', 'Voce deve digitar um nome para criar uma tabela ou escolher uma tabela para editar');
     	}
    	else{
    		Ext.ComponentQuery.query('#tbpanel')[0].show();
    		Ext.ComponentQuery.query('#paneledittab')[0].show();
    		Ext.ComponentQuery.query('#criartabelahtml')[0].hide();
    		Ext.ComponentQuery.query('#gridedittabelas')[0].show();
    		Ext.ComponentQuery.query('#editartabelahtml')[0].show();
    		Ext.ComponentQuery.query('#formcriatabelas')[0].hide();
    		Ext.ComponentQuery.query('#gridedittabelas')[0].setTitle('Editando a tabela :  '+tablename+'' );
    	}
		grid.getView().refresh();
    },
    adicionaCampo: function(){
    	if(save === false){
    		Ext.Msg.alert('Atencao', 'Antes de adicionar novo campo Clique em "Gravar Alteracoes".');
    	}
    	else{
    		var grid = Ext.ComponentQuery.query('#gridedittabelas')[0];
      		grid.store.add({Field:'novo_campo'+novocamponr+'', Type:'varchar(50)', Null:'NO'});
        	Ext.Msg.alert('Atencao', 'novo_campo '+novocamponr+' adicionado na Tabela, Para editar clique na celula. ' +
        				'Pelo menos o nome do campo deve ser editado.');
        	grid.getView().refresh();
        	novocamponr++;
        	save = false;
    	}
    },
    removeCampo: function(){ 
    	var grid = Ext.ComponentQuery.query('#gridedittabelas')[0];
    	if(grid.getSelectionModel().hasSelection()){
    		var campo = grid.getSelectionModel().getLastSelected();
      		grid.store.remove(campo);
        	grid.getView().refresh();
    	}
    	else{
    		Ext.Msg.alert('Atencao', 'Voce deve selecionar o campo de deseja excluir');
    	}
    },
    salvarTabela: function(){
    	var dbname = Ext.ComponentQuery.query('#databasetab')[0].getValue();
    	var tablename = Ext.ComponentQuery.query('#tabelastab')[0].getValue();    
    	Ext.ComponentQuery.query('#gridedittabelas')[0].getSelectionModel().selectAll();
    	var grid = Ext.ComponentQuery.query('#gridedittabelas')[0];
        var cl = Ext.ComponentQuery.query('#gridedittabelas')[0].getSelectionModel().getSelection();
    	var cmpo = [];
        var typ = [];
        var nl = [];
		Ext.each(cl, function(record){
			cmpo.push(record.data.Field);
			typ.push(record.data.Type);
			nl.push(record.data.Null);
		});	
		var campo = Ext.encode(cmpo);
		var type = Ext.encode(typ);
		var nulo = Ext.encode(nl);

		Ext.Ajax.request({
			 url: 'php/Mydb/AlteraTabela.php',
			 method: 'POST',
			 params: {
			 	Database: dbname,
			 	Tabela: tablename, 
			 	Campo: campo,
			 	Type: type,
			 	Nulo: nulo,
			 	Length: cl.length
			 },
			 success: function(){
				Ext.Msg.alert('Dados Salvos', 'Os dados foram salvos');
				save = true;
   			 },
			 failure: function(){
			 	Ext.Msg.alert('Falhou', 'A operacao falhou. reveja os dados digitados.');
			 },
			 scope: this
    	})
    	this.carregaCampos();
		grid.getStore().load();
		grid.getView().refresh();
		grid.getSelectionModel().clearSelections();
		save = true; 
    }
});