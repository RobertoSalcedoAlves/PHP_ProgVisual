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
   
//FUNCOES DO GERADOR CRUD

Ext.define('DIAS.view.MyFunctions', {
    extend: 'DIAS.view.MyTab',
    
    reiniciaAlteraTema: function(){
    	var tema = Ext.ComponentQuery.query('#temas')[0].getValue();
     	if (tema === 'Tema1' ){
 			window.location.href = 'index.html';
    	}
    	else {
 			window.location.href = 'index2.html';
    	}
    },
    testaConexaoMysql: function(){
     	var formConn = Ext.ComponentQuery.query('#conectDB')[0];
    	Ext.Ajax.request({
    		 url: 'php/Mydb/ConnDB.php',
    		 method: 'GET',
     	 	 waitMsg: 'Conectando...',    	 	 
    	 	 success: function () {
    	 	 	Ext.Msg.alert('Mensagem','Conexao OK.');
			 },    	 	 
		 	 failure: function () {
				Ext.Msg.alert('Mensagem','Nao foi possivel conectar, verifique os dados.');
			 }
    	});
    },
    conectaDB: function(){
    	Ext.ComponentQuery.query('#rodapanel')[0].collapse();
    	Ext.ComponentQuery.query('#cabepanel')[0].collapse();
      	Ext.ComponentQuery.query('#panelDB')[0].show();
      	Ext.ComponentQuery.query('#panelconect')[0].hide();
      	Ext.ComponentQuery.query('#paneltabelas')[0].show();
      	Ext.ComponentQuery.query('#paneltabelas')[0].expand();
     	var comboDB = Ext.ComponentQuery.query('#listaDB')[0].items.items[0];
     	comboDB.reset();
      	comboDB.store.removeAll();
     	comboDB.store.load({
     	failure: function () {
			Ext.MessageBox.alert ('Message','Nao foi possivel conectar, verifique os dados.');
		}     	
     	});
     	Ext.ComponentQuery.query('#connPanel')[0].setTitle('Conectado ao Servidor: local');  
    },
    carregaTabelas: function(){ 
     	dbname = Ext.ComponentQuery.query('#listaDB')[0].items.items[0].getValue();   
      	var gridTabelas = Ext.ComponentQuery.query('#gridTabelas')[0];
        gridTabelas.store.load({params: {Database: dbname}});     
        Ext.ComponentQuery.query('#connPanel')[0].setTitle('Conectado ao Servidor: local | DB: '+dbname+'');
   		Ext.ComponentQuery.query('#rodapanel')[0].collapse();
    	Ext.ComponentQuery.query('#cabepanel')[0].collapse();
    	Ext.ComponentQuery.query('#databasetab')[0].setValue(dbname);
    	Ext.ComponentQuery.query('#gridTabelas')[0].show();
    },

    carregaCampos: function(){
    	var tablename = Ext.ComponentQuery.query('#tabelastab')[0].getValue();
		var gridCampos = Ext.ComponentQuery.query('#gridCampos')[0];
      	var cpchave = Ext.ComponentQuery.query('#campochave')[0];
      	cpchave.clearValue();
        gridCampos.getStore().load({params: { Database: dbname, Tabela: tablename}});
        cpchave.getStore().load({params: { Database: dbname, Tabela: tablename}});
        Ext.ComponentQuery.query('#connPanel')[0].setTitle('Conectado ao Servidor: local | DB: '+dbname+'  | Tabela: '+tablename+'');
   		Ext.ComponentQuery.query('#gridedittabelas')[0].setTitle('Editando a tabela :  '+tablename+'' );
    }, 
     
    opcoesParaGer: function(){    	
    	Ext.ComponentQuery.query('#panelopcoes')[0].show();    	
    },
    
    abreGridConfigura: function(j){  
    	var endquant = 0;
    	var quant = 0;
    	var tbl = [];
    	var seltab = Ext.ComponentQuery.query('#gridTabelas')[0];
      	var tab = seltab.getSelectionModel().getSelection();
        if (seltab.getSelectionModel().hasSelection()){
			Ext.each(tab, function(tabsel){
				tbl.push(tabsel.data[0]);
			});
			var t = Ext.encode(tbl);
			quant = (tbl.length+1);
			endquant = tbl.length;
			var tablename = tbl[j];
			
			//Altera os titulos da grid das tabelas
			Ext.ComponentQuery.query('#formGridCampos')[0].setTitle('Defina na Grid abaixo as configuracoes do formulario do CRUD para a tabela:  '+tablename+'' );
			Ext.ComponentQuery.query('#formchave')[0].setTitle('Defina o campo chave para a tabela:  '+tablename+'' );
			
    		//Define o primeiro campo da dabela como chave
    		Ext.ComponentQuery.query('#panelGrid')[0].show(); 
    		var gridTabela = Ext.ComponentQuery.query('#gridCampos')[0];
    		var cpch = [];
      		gridTabela.store.load({
    			params: {Database: dbname, Tabela: tablename},
    			callback: function() {       	    
            		var data = gridTabela.store.getProxy().getReader().rawData;
            		cpch = data.config;    
           		 	var chav = cpch[0];
            		Ext.each(chav, function(op) {
            			var c = op.Field;
            			Ext.ComponentQuery.query('#panelGrid')[0].items.items[0].items.items[0].setValue(c);
            			Ext.ComponentQuery.query('#gridCampos')[0].getSelectionModel().selectAll();
  					})
         		}         
    		});
        	Ext.ComponentQuery.query('#gridCampos')[0].getSelectionModel().selectAll();
    		Ext.ComponentQuery.query('#rodapanel')[0].collapse();
    		Ext.ComponentQuery.query('#cabepanel')[0].collapse();
    		Ext.ComponentQuery.query('#panelcontrole')[0].collapse();
    		Ext.ComponentQuery.query('#origemdados')[0].collapse();
    		//Ext.ComponentQuery.query('#panelGrid')[0].show();
    		//Ext.ComponentQuery.query('#gridCampos')[0].getSelectionModel().clearSelections();
    		//Ext.ComponentQuery.query('#gridCampos')[0].getSelectionModel().selectAll();
        	Ext.ComponentQuery.query('#listaDB')[0].items.items[0].readOnly = true;
    		Ext.ComponentQuery.query('#connPanel')[0].disable();
     		}else{
	  			Ext.Msg.alert('Mensagem', 'Voce deve escolher pelo menos uma tabela.')
	  		}//end else seltab	
	  		j++
    },
    
    passoPasso: function(){
    	var pp = true;
    	j=0;
    	this.defineTabela(pp)
    },
        
    preVisualiza: function(){
    	this.criaGrid(j)
    },
    
    voltarTabela: function(){
    	j--
    	if (j<0){
    		j++
    		Ext.Msg.alert('Inicio', 'Voce esta na primeira tabela ');
    	}else{
    		var pp = true;
    		this.defineTabela(pp)
    	}
    },
    
    proximaTabela: function() {
    	this.salvaCRUD()
    	j++
    	var pp = true;
        this.defineTabela(pp)    
    },
    
    defineTabela: function(pp){
    	var k=0
    	var endquant = 0;
    	var quant = 0;
   		var tbl = [];
   		var seltab = Ext.ComponentQuery.query('#gridTabelas')[0];
      	var tab = seltab.getSelectionModel().getSelection();
        if (seltab.getSelectionModel().hasSelection()){
			Ext.each(tab, function(tabsel){
				tbl.push(tabsel.data[0]);
			});
			var t = Ext.encode(tbl);
			quant = (tbl.length+1);
			endquant = tbl.length;
			if (pp===true){
				if (j===endquant){
					Ext.ComponentQuery.query('#opmodulos')[0].setValue(dbname);
    				Ext.Msg.alert('Sucesso', 'Terminou, foi gerado ' +
    						' um aplicativo com nome: " '+dbname+ ' "' +
    						' e os CRUD para as seguintes tabelas: ' +t+ ' ' +
    						' Utilize o menu ao lado para visualizar o aplicativo gerado ----->');
    				Ext.ComponentQuery.query('#panelcontrole')[0].expand();
    				Ext.ComponentQuery.query('#origemdados')[0].expand();
    				Ext.ComponentQuery.query('#listaDB')[0].items.items[0].readOnly = false;
    				Ext.ComponentQuery.query('#panelopcoes')[0].show(); 
				}else{
					this.abreGridConfigura(j)
				}
			}else{
			for (k=0;k<quant;k++){
    			var tablename = tbl[k];
     			if (k===endquant){
     				Ext.ComponentQuery.query('#opmodulos')[0].setValue(dbname);
    				Ext.Msg.alert('Sucesso', 'Terminou, foi gerado ' +
    						' um aplicativo com nome: " '+dbname+ ' "' +
    						' e os CRUD para as seguintes tabelas: ' +t+ ' ' +
    						' Cliqeu em "Visualizar" no menu ao lado para ver o aplicativo gerado ------>');
    				Ext.ComponentQuery.query('#panelcontrole')[0].expand();
    				Ext.ComponentQuery.query('#origemdados')[0].expand();
    			}else{
    				this.criaMultiCrud(k)
    			} 
			}//end for
		  }//end else pp
	  	}else{
	  		Ext.Msg.alert('Mensagem', 'Voce deve escolher pelo menos uma tabela.')
	  	}//end else seltab
    },    
   
    criaMultiCrud: function(k){
    	var quant = 0;
   		var tb = [];
  		var dbsx = [];
      	var tab = Ext.ComponentQuery.query('#gridTabelas')[0].getSelectionModel().getSelection();
		Ext.each(tab, function(tabsel){
			tb.push(tabsel.data[0]);
			dbsx.push(tabsel.data);
		}); 
		var tablename = tb[k];
		var cp = [];
 	   	var camp = [];
 	   	var c = [];
    	var storeCampos = Ext.create('DIAS.store.StoreCampos', {});
    	storeCampos.removeAll();
    	storeCampos.load({
    	params: {Database: dbname, Tabela: tablename},
    	callback: function() {       	    
            	var data = storeCampos.getProxy().getReader().rawData;
              	cp = data.config;
            	camp = data.config;
            	
				//Define o primeiro campo da dabela como chave
            	var chav = cp[0];
            	Ext.each(chav, function(op) {
            		c = op.Field; 				
  				})
  				
    	 		//Define outras variaveis
  				var colun = [];
  				var rot = []; 
  				var contr = [];
  				var stcb = [];
  				var valid = [];
  				var tam = [];
  				var plug = [];
  				var visib = [];
  				var nul = [];
  				var soleit = [];
  				var maxi = [];
   				Ext.each(camp, function(op) {
            		colun.push(op.Field);
					rot.push(op.Rotulo);
					contr.push(op.Controle);
					stcb.push(op.Storecb);
					valid.push(op.Validacao);
					tam.push(op.Tamanho);
					plug.push(op.Plug);
					visib.push(op.Invisivel);
					nul.push(op.Nulo);
					soleit.push(op.SoLeitura);
					maxi.push(op.Maximo); 			
  				});  				
			 	var colunas = Ext.encode(colun);
				var controle = Ext.encode(contr);
				var rotulo = Ext.encode(rot);
				var storecb = Ext.encode(stcb);
				var validacao = Ext.encode(valid);
				var tamanho = Ext.encode(tam);
				var plugin = Ext.encode(plug);
				var invisivel = Ext.encode(visib);
				var nulo = Ext.encode(nul);
				var soleitura = Ext.encode(soleit);
				var maximo = Ext.encode(maxi);
				var dbase = Ext.encode(tb);
				var dbasex = Ext.encode(dbsx)
				
				//Valores para os filtros
				var order = c;
				var campo0 = c;
				var field0 = c;
				var campo1 = '';
				var field1 = '';
				var campo5 = '';
				var field5 = '';
				var cond1 = '';
				var cond5 = '';
				var arg1 = '';
				var arg5 = '';
				
    	 		//Inicia geracao dos CRUD
    			Ext.Ajax.request({
			 	url: 'php/Mydb/SalvarMultiCrud.php',
			 	method: 'GET',
			 	params: {
    		 		Database: dbname, 
    		 		Tabela: tablename,
    				Dbasex: dbasex, Dbase: dbase, Controle: controle, Rotulo: rotulo, Storecb: storecb, Validacao: validacao, Tamanho: tamanho,
    				Plugin: plugin, Invisivel: invisivel, SoLeitura: soleitura, Maximo: maximo, Nulo: nulo, 
    				Colunas: colunas, Field0: field0, Field1: field1, Field5: field5, Cond1: cond1, Cond5: cond5, 
    				Valor1: arg1, Valor5: arg5, Order: order
    	 		}, 
    	  		waitMsg: 'Salvando as configuracoes aguarde...'   	 	 
     	  		});

		  		//Inicia gravacao das configuracoes individuais para cada tabela		 	
			 	Ext.Ajax.request({
			 	url: 'php/Mydb/SalvarMultiConfig.php',
			 	method: 'GET',
			 	params: {
    		 		Database: dbname, 
    		 		Tabela: tablename,
    				Dbasex: dbasex, Dbase: dbase, Controle: controle, Rotulo: rotulo, Storecb: storecb, Validacao: validacao, Tamanho: tamanho,
    				Plugin: plugin, Invisivel: invisivel, SoLeitura: soleitura, Maximo: maximo, Nulo: nulo, 
    				Colunas: colunas, Field0: field0, Field1: field1, Field5: field5, Cond1: cond1, Cond5: cond5, 
    				Valor1: arg1, Valor5: arg5, Order: order
    	 		}, 
    	  		waitMsg: 'Salvando as configuracoes aguarde...'   	 	 
    	  	})	
    	 }//end callback  	  
      })//end load
    },
  
    criaGrid: function(j){  
    	var tb = [];
  		var dbsx = [];
      	var tab = Ext.ComponentQuery.query('#gridTabelas')[0].getSelectionModel().getSelection();
		Ext.each(tab, function(tabsel){
			tb.push(tabsel.data[0]);
			dbsx.push(tabsel.data);
		});
		var dbase = Ext.encode(tb);
		var dbasex = Ext.encode(dbsx)
		var	tablename = tb[j];    	
     	var dbname = Ext.ComponentQuery.query('#listaDB')[0].items.items[0].getValue();   
	  	var chave = Ext.ComponentQuery.query('#panelGrid')[0].items.items[0].items.items[0].getValue();		
       	var field0 = Ext.ComponentQuery.query('#panelGrid')[0].items.items[0].items.items[0].getValue();
    	var field1 = Ext.ComponentQuery.query('#listaCampos')[0].items.items[0].getValue();
    	var field5 = Ext.ComponentQuery.query('#formArgumento5')[0].items.items[0].getValue();
    	var cond1 = Ext.ComponentQuery.query('#listaCampos')[0].items.items[1].getValue();
    	var cond5 = Ext.ComponentQuery.query('#formArgumento5')[0].items.items[1].getValue();
    	var arg1 = Ext.ComponentQuery.query('#listaCampos')[0].items.items[2].getValue();
     	var arg5 = Ext.ComponentQuery.query('#formArgumento5')[0].items.items[2].getValue();
    	var order = Ext.ComponentQuery.query('#panelGrid')[0].items.items[0].items.items[0].getValue();
	    	
        Ext.ComponentQuery.query('#formview')[0].hide();
        Ext.ComponentQuery.query('#panelview')[0].show();
        
        Ext.create('DIAS.view.MyForm', {
                id:'formview',
                layout:'column',
                frame: true,
                renderTo: 'panelview'
        });

        Ext.ComponentQuery.query('#gpanel')[0].show();
        Ext.ComponentQuery.query('#gpanel')[0].el.mask('Gerando a GRID aguarde...', 'x-mask-loading');
        Ext.ComponentQuery.query('#mygrid')[0].hide();
        
        var colun = [];
        var contr = [];
        var tam = [];
        var rot = [];
        var stcb = [];
        var valid = [];
        var plug = [];
        var nul = [];
        var visib = [];
        var soleit = [];
        var maxi = [];
        var col = Ext.ComponentQuery.query('#gridCampos')[0].getSelectionModel().getSelection();
		Ext.each(col, function(record){
			colun.push(record.data.Field);
			rot.push(record.data.Rotulo);
			contr.push(record.data.Controle);
			stcb.push(record.data.Storecb);
			valid.push(record.data.Validacao);
			tam.push(record.data.Tamanho);
			plug.push(record.data.Plug);
			visib.push(record.data.Invisivel);
			nul.push(record.data.Nulo);
			soleit.push(record.data.SoLeitura);
			maxi.push(record.data.Maximo);
		});	
			var colunas = Ext.encode(colun);
			var rotulo = Ext.encode(rot);
			var controle = Ext.encode(contr);
			var storecb = Ext.encode(stcb);
			var validacao = Ext.encode(valid);
			var tamanho = Ext.encode(tam);	
			var plugin = Ext.encode(plug);	
			var invisivel = Ext.encode(visib);	
			var nulo = Ext.encode(nul);	
			var soleitura = Ext.encode(soleit);	
			var maximo = Ext.encode(maxi);	
			
        var storeConfig = Ext.create('DIAS.store.StoreForm', {}); 
    	storeConfig.load({params: {
    		Database: dbname, Tabela: tablename,
    		Dbasex: dbasex, Dbase: dbase, Controle: controle, Rotulo: rotulo, Storecb: storecb, Validacao: validacao, Tamanho: tamanho,
    		Plugin: plugin, Invisivel: invisivel, SoLeitura: soleitura, Maximo: maximo, Nulo: nulo, 
    		Colunas: colunas, Field0: field0, Field1: field1, Field5: field5, Cond1: cond1, Cond5: cond5, 
    		Valor1: arg1, Valor5: arg5, Order: order
    	},    	   
    	
    	callback: function() {       	    
     	   	var columns = [];
    	   	var fields = [];
    	   	var items = [];
            var data = storeConfig.getProxy().getReader().rawData;
            if (data.columns) {
                 columns = data.columns; 
                 fields = data.campos;
                 items = data.items;
        	}
    	
        	var mdGrid = Ext.define('DIAS.model.MDados',{extend: 'Ext.data.Model', fields: fields})
            
 			var store = Ext.create('DIAS.store.StoreGrid', {model: mdGrid});
 			store.getProxy().extraParams.Database=dbname,
 	  		store.getProxy().extraParams.Tabela=tablename,
 	   		store.getProxy().extraParams.Colunas=colunas,
 	   		store.getProxy().extraParams.Field0=field0,
 	  		store.getProxy().extraParams.Field1=field1,
 	   		store.getProxy().extraParams.Field5=field5,
 	   		store.getProxy().extraParams.Cond1=cond1, 
 	  		store.getProxy().extraParams.Cond5=cond5,
 	   		store.getProxy().extraParams.Valor1=arg1,
 	   		store.getProxy().extraParams.Valor5=arg5,
 	   		store.getProxy().extraParams.Order=order	
 			
     		store.load({params: {start: 0 , limit: 15,
    			Database: dbname, Tabela: tablename,
    			Colunas: colunas, Field0: field0, Field1: field1, Field5: field5, Cond1: cond1,  
    			Cond5: cond5, Valor1: arg1, Valor5: arg5, Order: order
    		}, 
    	  	 
     		callback: function() {
       	    
    	   	Ext.ComponentQuery.query('#formview')[0].getForm().reset();
 
    	   	Ext.create('DIAS.view.MyGrid', {
                id:'mygrid',
                renderTo: 'gpanel',
                autoSizeGrid: true,
                autoSizeColumns: true,
                title: 'DB: '+dbname+' | Tabela: '+tablename+'',
                closable: false,
                forceFit: true,
                store: store, 
                columns: columns,
                autoScroll: true,
                selModel: Ext.create('Ext.selection.RowModel', {mode: 'SINGLE'}),
                bbar: Ext.create('PagingToolbar',{
						pageSize: 15,
						store: store,
			     		displayInfo: true,
						displayMsg: 'Mostrando {0} - {1} de {2}',
						emptyMsg: 'Sem Dados'
				})
            }); 

            Ext.ComponentQuery.query('#mygrid')[0].getView().refresh();
            Ext.ComponentQuery.query('#mygrid')[0].doLayout();
            
            function adicionarItensNoForm(){
               	var list = [];
            	var dados = storeConfig.getProxy().getReader().rawData;
				if (dados.items) {
                 list = dados.items;
             	}

              	var logoform = {
        			xtype: 'label',
        			height: 100,
        			width: 800,
        			style: 'font-size:large;font-weight:bold;color:blue;text-align:center;display:block;width:500px;height:100px;',
        			id: 'myformlogo',
        			renderTo: document.body,
        			html: '<object width="100%" height="100%" data="./resources/html/logoform.html"></object>'
    			};    			
    			Ext.ComponentQuery.query('#formview')[0].add(logoform);
    			
    			var myfieldset = {
    				xtype : 'fieldset',
                    id:'myfieldset',
    			    title : 'Formulario',
    				layout:'column',
    				renderTo:'formview',
    				autoHeight : true,
    				items : []    
    			};
    			Ext.ComponentQuery.query('#formview')[0].add(myfieldset);
    			
    			var msgform = {
        			xtype: 'label',
        			height: 100,
        			width: 800,
         			id: 'mymsgform',
        			renderTo: document.body,
        			autoLoad:{url:'./resources/html/mensagemform.html', scripts:true}
    			};
    			Ext.ComponentQuery.query('#formview')[0].add(msgform);   
    			
   				/*   				
              	Ext.each(list, function(op) {
              	var plg = '';
              	if (op.mask === 'uppercase'){plg = [new Ux.Uppercase()]}
              	else if (op.mask === ''){plg = '';}else{plg = [new Ux.InputTextMask(op.mask)]};
              	var	novo_campo = {	
  					xtype: op.xtype,
                	id: op.id,
                	hidden: op.hidden,
                	plugins: plg,
                	allowBlank: op.allowBlank,
                	readOnly: op.readOnly,
                	maxLength: op.maxLength,
                	name: op.name,
                	width: op.width,
                	fieldLabel: op.fieldLabel,
                	labelAlign: 'right',
                	format: 'd/m/Y',
        			altFormats: 'd,m,Y|d\/m\/Y',
        			vtype: op.vtype, 
        			mode: 'local',
         			store: op.store
        		};
   				Ext.ComponentQuery.query('#myfieldset')[0].add(novo_campo); 				
			 });*/
			 
			 //Adicionando campos no fieldset 
			 Ext.ComponentQuery.query('#myfieldset')[0].add(items);
			 Ext.ComponentQuery.query('#formview')[0].doLayout();
          }  
            Ext.ComponentQuery.query('#panelview')[0].show();            
            adicionarItensNoForm();
    		Ext.ComponentQuery.query('#gpanel')[0].show();
 			Ext.ComponentQuery.query('#gpanel')[0].el.unmask();
 			Ext.ComponentQuery.query('#gpanel')[0].doLayout(); 			
			//j++;
     	 }  
       })
     }});
   },
  	adicionar: function(){
  			var tbl = [];
    		var seltab = Ext.ComponentQuery.query('#gridTabelas')[0];
      		var tab = seltab.getSelectionModel().getSelection();
 			Ext.each(tab, function(tabsel){
				tbl.push(tabsel.data[0]);
			});
			var tablename = tbl[j];
  			var chave = Ext.ComponentQuery.query('#panelGrid')[0].items.items[0].items.items[0].getValue();
  			Ext.ComponentQuery.query('#mygrid')[0].getSelectionModel().clearSelections();
  			Ext.ComponentQuery.query('#panelview')[0].update = true;
			Ext.ComponentQuery.query('#panelview')[0].show();
			Ext.getCmp(chave).emptyText = 'Auto';
			Ext.getCmp(chave).readOnly = true;
			Ext.ComponentQuery.query('#formview')[0].setTitle('[Adicionando]');
			Ext.ComponentQuery.query('#myfieldset')[0].setTitle('Adicionando dados em DB: '+dbname+' | Tabela: '+tablename+'');
			Ext.ComponentQuery.query('#formview')[0].getForm().findField(chave).setReadOnly(true);
			Ext.ComponentQuery.query('#formview')[0].getForm().reset();
			insert = true;
	},
	editar: function(){
			var tbl = [];
    		var seltab = Ext.ComponentQuery.query('#gridTabelas')[0];
      		var tab = seltab.getSelectionModel().getSelection();
 			Ext.each(tab, function(tabsel){
				tbl.push(tabsel.data[0]);
			});
			var tablename = tbl[j];
			var chave = Ext.ComponentQuery.query('#panelGrid')[0].items.items[0].items.items[0].getValue();
			var record = Ext.ComponentQuery.query('#mygrid')[0].getSelectionModel().getLastSelected();
			if(Ext.ComponentQuery.query('#mygrid')[0].getSelectionModel().hasSelection()){
				Ext.ComponentQuery.query('#panelview')[0].update = true;
				Ext.ComponentQuery.query('#panelview')[0].show();
				Ext.getCmp(chave).readOnly = true;
				Ext.ComponentQuery.query('#formview')[0].setTitle('[Alterando]');
				Ext.ComponentQuery.query('#myfieldset')[0].setTitle('Alterando dados em DB: '+dbname+' | Tabela: '+tablename+' | ' +chave+': '+record.data[chave]+'');
				Ext.ComponentQuery.query('#formview')[0].getForm().findField(chave).setReadOnly(true);
				Ext.ComponentQuery.query('#formview')[0].getForm().loadRecord(record);
			}else{
				Ext.Msg.alert('Atencao', 'Selecione um registro');
			}
			insert = false;
	},
	deletar: function(){
			var tbl = [];
    		var seltab = Ext.ComponentQuery.query('#gridTabelas')[0];
      		var tab = seltab.getSelectionModel().getSelection();
 			Ext.each(tab, function(tabsel){
				tbl.push(tabsel.data[0]);
			});
			var tablename = tbl[j];
			var chave = Ext.ComponentQuery.query('#panelGrid')[0].items.items[0].items.items[0].getValue();
  			if(Ext.ComponentQuery.query('#mygrid')[0].getSelectionModel().hasSelection()){
				var record = Ext.ComponentQuery.query('#mygrid')[0].getSelectionModel().getLastSelected();
				var val1 = record.data[chave];
				Ext.Msg.confirm('Atencao', 'Voce esta prestes a excluir o registro com <b> ' +chave+' = '+val1+'</b>. Deseja continuar?', function(btn){
					if(btn === 'yes'){
						Ext.Ajax.request({
							url: 'php/Mydb/Delete.php',
							method: 'GET',
							params: {
								Database: dbname, 
								Tabela: tablename, 
    	  	 					Field1: chave,
 								Val1: val1
	    					},      	  	                
							success: function(){
								Ext.ComponentQuery.query('#mygrid')[0].store.remove(record);
							},
							failure: function(){
								Ext.Msg.alert('Erro', 'A Operacao falhou');
							},
							scope: this
						})
					}
					else{
						Ext.Msg.alert('Mensagem', 'Operacao Cancelada');
					}					
				}, this)
			}			
			else{
				Ext.Msg.alert('Atencao', 'Selecione um registro');
			}
	},
	salvar: function(){
			var tbl = [];
    		var seltab = Ext.ComponentQuery.query('#gridTabelas')[0];
      		var tab = seltab.getSelectionModel().getSelection();
 			Ext.each(tab, function(tabsel){
				tbl.push(tabsel.data[0]);
			});
			var tablename = tbl[j];
			var valores = [];
			var fields = [];
			var chave = Ext.ComponentQuery.query('#panelGrid')[0].items.items[0].items.items[0].getValue();
			var valores = Ext.ComponentQuery.query('#formview')[0].getForm().getValues();
			var fields = Ext.ComponentQuery.query('#formview')[0].getForm().getFields();
			if(Ext.ComponentQuery.query('#formview')[0].getForm().isValid()){
				Ext.ComponentQuery.query('#panelview')[0].el.mask('Salvando...', 'x-mask-loading');
			   //INSERT
			   if (insert === true){
			  	 Ext.Ajax.request({
				    url: 'php/Mydb/Insert.php',
				    method: 'POST',
					params: {
						Database: dbname, 
						Tabela: tablename,
						Field1: chave,
    	  	 			Val1: val1,    	  	 				 
    	  	 			Fields: Ext.encode(fields.keys),
    	  	 			Valores: Ext.encode(valores),
    	  	 			Length: fields.length
    	  	 		},
					success: function(){
						Ext.ComponentQuery.query('#mygrid')[0].getSelectionModel().clearSelections();
						this.criaGrid();
						Ext.ComponentQuery.query('#panelview')[0].el.unmask();
						Ext.ComponentQuery.query('#panelview')[0].hide();
						Ext.Msg.alert('Ok', 'Dados Salvos');
					},
					failure: function(){
						Ext.ComponentQuery.query('#panelview')[0].el.unmask();
						Ext.Msg.alert('Erro', 'A operacao falhou');
					},
					scope: this
				})
			  }
			  //UPDATE
			  if (insert === false){
			  	var record = Ext.ComponentQuery.query('#mygrid')[0].getSelectionModel().getLastSelected();
				var val1 = record.data[chave];
				Ext.Ajax.request({
				    url: 'php/Mydb/Update.php',
				    method: 'POST',
					params: {
						Database: dbname, 
						Tabela: tablename,
						Field1: chave,
    	  	 			Val1: val1,    	  	 				 
    	  	 			Fields: Ext.encode(fields.keys),
    	  	 			Valores: Ext.encode(valores),
    	  	 			Length: fields.length
    	  	 		},
					success: function(){
						Ext.ComponentQuery.query('#mygrid')[0].getSelectionModel().clearSelections();
						this.criaGrid();
						Ext.ComponentQuery.query('#panelview')[0].el.unmask();
						Ext.ComponentQuery.query('#panelview')[0].hide();
						Ext.Msg.alert('Ok', 'Dados Salvos');
					},
					failure: function(){
						Ext.ComponentQuery.query('#panelview')[0].el.unmask();
						Ext.Msg.alert('Erro', 'A operacao falhou');
					},
					scope: this
				})
			   }
			}else{
				Ext.Msg.alert('Atencao', 'Existem campos invalidos');
			}
	},
	gerarPDF: function(){
			Ext.Msg.alert('Informacao', 'Esta funcionalidade nao foi adicionada neste modulo.' +
					' Para adicionar esta ou outra funcionalidade envie e-mail para dias@dias.adm.br' +
					' ou envie mensagem pelo formulario de contato do site www.dias.adm.br');	
	},
	redefinirFiltros: function(){
			Ext.ComponentQuery.query('#mygrid')[0].getSelectionModel().clearSelections();
	        Ext.ComponentQuery.query('#panelArgumentos')[0].show();		
	},
	redefinirGrid: function(){
			Ext.ComponentQuery.query('#mygrid')[0].getSelectionModel().clearSelections();
			Ext.ComponentQuery.query('#listaCampos')[0].getForm().reset();
			Ext.ComponentQuery.query('#formArgumento5')[0].getForm().reset();
			Ext.ComponentQuery.query('#formArgumento5')[0].hide();
			Ext.ComponentQuery.query('#panelGrid')[0].show();		
	},
	salvaCRUD: function(){		
			var tb = [];
  			var dbsx = [];
      		var tab = Ext.ComponentQuery.query('#gridTabelas')[0].getSelectionModel().getSelection();
			Ext.each(tab, function(tabsel){
				tb.push(tabsel.data[0]);
				dbsx.push(tabsel.data);
			});
			var dbase = Ext.encode(tb);
			var dbasex = Ext.encode(dbsx)
			var	tablename = tb[j];    	
     		var dbname = Ext.ComponentQuery.query('#listaDB')[0].items.items[0].getValue();   
	  		var c = Ext.ComponentQuery.query('#campochave')[0].getValue();		
    		
    		var colun = [];
        	var contr = [];
       		var tam = [];
       	 	var rot = [];
        	var stcb = [];
        	var valid = [];
        	var plug = [];
        	var nul = [];
        	var visib = [];
        	var soleit = [];
        	var maxi = [];
        	var col = Ext.ComponentQuery.query('#gridCampos')[0].getSelectionModel().getSelection();
			Ext.each(col, function(record){
			colun.push(record.data.Field);
			rot.push(record.data.Rotulo);
			contr.push(record.data.Controle);
			stcb.push(record.data.Storecb);
			valid.push(record.data.Validacao);
			tam.push(record.data.Tamanho);
			plug.push(record.data.Plug);
			visib.push(record.data.Invisivel);
			nul.push(record.data.Nulo);
			soleit.push(record.data.SoLeitura);
			maxi.push(record.data.Maximo);
			});	
			var colunas = Ext.encode(colun);
			var rotulo = Ext.encode(rot);
			var controle = Ext.encode(contr);
			var storecb = Ext.encode(stcb);
			var validacao = Ext.encode(valid);
			var tamanho = Ext.encode(tam);	
			var plugin = Ext.encode(plug);	
			var invisivel = Ext.encode(visib);	
			var nulo = Ext.encode(nul);	
			var soleitura = Ext.encode(soleit);	
			var maximo = Ext.encode(maxi);	
			
			var chave = c;
			var order = c;
			var campo0 = c;
			var field0 = c;
			var campo1 = '';
			var field1 = '';
			var campo5 = '';
			var field5 = '';
			var cond1 = '';
			var cond5 = '';
			var arg1 = '';
			var arg5 = '';
		
			//Inicia geracao dos CRUD
    			Ext.Ajax.request({
			 	url: 'php/Mydb/SalvarMultiCrud.php',
			 	method: 'GET',
			 	params: {
    		 		Database: dbname, 
    		 		Tabela: tablename,
    				Dbasex: dbasex, Dbase: dbase, Controle: controle, Rotulo: rotulo, Storecb: storecb, Validacao: validacao, Tamanho: tamanho,
    				Plugin: plugin, Invisivel: invisivel, SoLeitura: soleitura, Maximo: maximo, Nulo: nulo, 
    				Colunas: colunas, Field0: field0, Field1: field1, Field5: field5, Cond1: cond1, Cond5: cond5, 
    				Valor1: arg1, Valor5: arg5, Order: order
    	 		}, 
    	  		waitMsg: 'Salvando as configuracoes aguarde...'   	 	 
     	  		});

		  		//Inicia gravacao das configuracoes individuais para cada tabela		 	
			 	Ext.Ajax.request({
			 	url: 'php/Mydb/SalvarMultiConfig.php',
			 	method: 'GET',
			 	params: {
    		 		Database: dbname, 
    		 		Tabela: tablename,
    				Dbasex: dbasex, Dbase: dbase, Controle: controle, Rotulo: rotulo, Storecb: storecb, Validacao: validacao, Tamanho: tamanho,
    				Plugin: plugin, Invisivel: invisivel, SoLeitura: soleitura, Maximo: maximo, Nulo: nulo, 
    				Colunas: colunas, Field0: field0, Field1: field1, Field5: field5, Cond1: cond1, Cond5: cond5, 
    				Valor1: arg1, Valor5: arg5, Order: order
    	 		}, 
    	  		waitMsg: 'Salvando as configuracoes aguarde...'   	 	 
    	  	})	
 	},
 	visualizaModulo: function(){
 		var modcrud = Ext.ComponentQuery.query('#opmodulos')[0].getValue();
 		if(!modcrud){
 			Ext.Msg.alert('Message','O modulo nao foi gerado, voce deve gerar um modulo para visualizar.');
 		}
 		else {
 			var url = 'modulos/'+modcrud+'';
 			window.open(url);
 	    }
 	},
 	
 	helpConfig: function(){
 			var winHelp = Ext.create('DIAS.view.MyWindow', {
			id: 'winhelp',
			layout: 'fit',
			autoScroll: true,
			title: 'Ajuda para configuracoes',
			height: 600,
        	width: 850,
        	modal: true			
		})
		var formHelp = {
				xtype: 'panel',
				autoScroll: true,
				autoLoad: {url:'./resources/html/confHelp.html', scripts:true}
       		}
		winHelp.show();	
		winHelp.add(formHelp);
 	
 	},
	cancelar: function(){
			Ext.ComponentQuery.query('#gpanel')[0].show();
			Ext.ComponentQuery.query('#mygrid')[0].doLayout();

	}
});