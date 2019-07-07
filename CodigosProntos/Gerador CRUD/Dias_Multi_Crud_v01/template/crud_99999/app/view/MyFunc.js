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
   
//FUNCOES 

Ext.define('DIAS.view.MyFunc', {
    extend: 'DIAS.view.layout.MyView',
    
    defineTabela: function (){ 
    	var cf = [];
    	var tabl = Ext.ComponentQuery.query('#gridtabelas')[0].getSelectionModel().getSelection();
    	Ext.each(tabl, function(conf){
    		cf.push(conf.data[0]);
    	});
    	config = cf;
    	this.limpaFiltro();
    	this.criaGrid();
    },
    
	configAplic: function(){
		Config.collapse();
	},
        	
    criaGrid: function(){     	
    	
    	FormView.hide();
        PanelView.show();
        
        Ext.create('DIAS.view.MyForm', {
                id:'formview',
                layout:'column',
                frame: true,
                renderTo: 'panelview'
        });
     	
        GPanel.show();
        GPanel.el.mask('Gerando a GRID aguarde...', 'x-mask-loading');
        CrudGer.el.mask();
        Ext.ComponentQuery.query('#mygrid')[0].hide();
        
        var storeconf = Ext.create('DIAS.store.StoreConfig',{});
        storeconf.load({url: './php/json/'+config+'.json',
        callback: function() {
    	   	var columns = [];
    	   	var fields = [];
    	   	var items = [];
            var data = storeconf.getProxy().getReader().rawData;
            columns = data.columns;
            fields = data.fields;
            items = data.items;
            tablename = data.tablename;
            chave = data.chave;
            
            ComboField1.store.load({params: {Tablename: tablename}});
       		
            var campos = Ext.encode(fields);            
            var campo1 = ComboField1.getValue();
            var cond1 = ComboCond1.getValue();
            var val1 = TextArg1.getValue();
            var linhas = Linhas.getValue();
            
            var mdGrid = Ext.define('DIAS.model.MDados',{extend: 'Ext.data.Model', fields: fields})
            
 			var store = Ext.create('DIAS.store.StoreGrid', {model: mdGrid, pageSize: linhas, start: 0, limit: linhas});
 			store.getProxy().extraParams.Campos=campos,
 			store.getProxy().extraParams.Tablename=tablename,
 			store.getProxy().extraParams.Chave=chave,
 			store.getProxy().extraParams.Field1=campo1,
 	  		store.getProxy().extraParams.Cond1=cond1,
 	   		store.getProxy().extraParams.Valor1=val1,
 	   		store.getProxy().extraParams.limit=linhas, 	   		
 			store.load({params: {
 				limit: linhas,
    			Field1: campo1, 
    			Cond1: cond1, 
    			Valor1: val1
    		},
    		    		
      	 	callback: function() {   
      	 		var dataconf = store.getProxy().getReader().rawData;

            	server = dataconf.server;
            	dbname = dataconf.dbname;

    	   		FormView.getForm().reset();  
    	   		    	   		
            	var MGrid = Ext.create('DIAS.view.MyGrid', {
                	id:'mygrid',
                	renderTo: 'gpanel',
                	stripeRows: false,
                	stripeCols: false,
                	autoSizeGrid: true,
                	autoSizeColumns: true,
                	autoLoad: false,
                	title: 'DB: '+dbname+' | Tabela: '+tablename+'',
                	closable: false,
                	layout: 'fit',
                	forceFit: true,
                	store: store,
               	 	columns: columns,
                	selModel: Ext.create('Ext.selection.RowModel', {mode: 'SINGLE'}),
                	bbar: Ext.create('PagingToolbar',{
						pageSize: linhas,
						store: store,
			     		displayInfo: true,
						displayMsg: 'Mostrando {0} - {1} de {2}',
						emptyMsg: 'sem dados'
				})
            });
            function adicionarItensNoForm(){
            	FormView = Ext.ComponentQuery.query('#formview')[0];
    			PanelView = Ext.ComponentQuery.query('#panelview')[0];

				//Adiciona logo
              	/*var logoform = {
        			xtype: 'label',
        			height: 100,
        			width: 800,
        			style: 'font-size:large;font-weight:bold;color:blue;text-align:center;display:block;width:500px;height:100px;',
        			id: 'myformlogo',
        			renderTo: document.body,
        			html: '<object width="100%" height="100%" data="./resources/html/logoform.html"></object>'
    			};   				
   				FormView.add(logoform);*/
   				
   				//Adiciona fieldset
   				var myfieldset = {
    				xtype : 'fieldset',
                    id:'myfieldset',
    			    title : 'Formulario',
    				layout:'column',
    				renderTo:'formview',
    				autoHeight : true,
    				items : []    
    			};
    			FormView.add(myfieldset);
    			
    			//Adiciona mensagem
    			var msgform = {
        			xtype: 'label',
        			height: 100,
        			width: 800,
         			id: 'mymsgform',
        			renderTo: document.body,
        			autoLoad:{url:'./resources/html/mensagemform.html', scripts:true}
    			};
    			FormView.add(msgform); 
    			
    			//Adicionando campos no fieldset 
				Ext.ComponentQuery.query('#myfieldset')[0].add(items);
				
             	FormView.doLayout();
           }  
            PanelView.show();
            adicionarItensNoForm();
    		GPanel.show();
 			GPanel.el.unmask();
 			GPanel.doLayout();
 			GPanel.setTitle('Conectado ao Servidor: '+server+' ');
 			CrudGer.el.unmask();
 			ComboField1.store.load({params: {Tablename: tablename}});
 			
 			if (!dataconf.dados.length) {
            	Ext.Msg.alert('Informacao', 'A pesquisa nao retornou nenhum registro, reveja os argumentos do filtro' +
                				  ' e tente novamente.');
                CrudGer.el.unmask();
            	GPanel.el.unmask();
            	GPanel.doLayout();
            	ComboField1.store.load({params: {Tablename: tablename}});
            }
 			
     	  } 
       });
     }});
    },

 	limpaFiltro: function(){
 		ComboField1.reset();
        ComboCond1.reset();
        TextArg1.reset(); 	
 	},
  
  	adicionar: function(){
   			Ext.ComponentQuery.query('#mygrid')[0].getSelectionModel().clearSelections();
  			PanelView.update = true;
			PanelView.show();
			Ext.getCmp(chave).emptyText = 'Auto';
			Ext.getCmp(chave).readOnly = true;
			FormView.setTitle('[Adicionando]');
			Ext.ComponentQuery.query('#myfieldset')[0].setTitle('Adicionando dados em DB: '+dbname+' | Tabela: '+tablename+'');
			FormView.getForm().findField(chave).setReadOnly(true);
			FormView.getForm().reset();
			insert = true;
	},
		
	editar: function(){
			var record = Ext.ComponentQuery.query('#mygrid')[0].getSelectionModel().getLastSelected();
			if(Ext.ComponentQuery.query('#mygrid')[0].getSelectionModel().hasSelection()){
				PanelView.update = true;
				PanelView.show();
				Ext.getCmp(chave).readOnly = true;
				FormView.setTitle('[Alterando]');
				Ext.ComponentQuery.query('#myfieldset')[0].setTitle('Alterando dados em DB: '+dbname+' | Tabela: '+tablename+' | ' +chave+': '+record.data[chave]+'');
				FormView.getForm().findField(chave).setReadOnly(true);
				FormView.getForm().loadRecord(record);
			}else{
				Ext.Msg.alert('Atencao', 'Selecione um registro');
			}
			insert = false;
	},
		
	deletar: function(){
  			if(Ext.ComponentQuery.query('#mygrid')[0].getSelectionModel().hasSelection()){
				var record = Ext.ComponentQuery.query('#mygrid')[0].getSelectionModel().getLastSelected();
				var val1 = record.data[chave];
				Ext.Msg.confirm('Atencao', 'Voce esta prestes a excluir o registro com <b> ' +chave+' = '+val1+'</b>. Deseja continuar?', function(btn){
					if(btn === 'yes'){
						Ext.Ajax.request({
							url: 'php/Delete.php',
							method: 'GET',
							params: {
								Tablename: tablename,
								Chave: chave,
								Field1: chave,
 								Val1: val1
	    					},      	  	                
							success: function(){
								Ext.ComponentQuery.query('#mygrid')[0].store.remove(record);
								Ext.Msg.alert('Mensagem', 'Registro deletado.');
							},
							failure: function(){
								Ext.Msg.alert('Erro', 'A Operacao falhou');
							},
							scope: this
						})
					}
					else{
						Ext.Msg.alert('Mensagem', 'Operacao Cancelada.');
					}					
				}, this)
			}			
			else{
				Ext.Msg.alert('Atencao', 'Selecione um registro.');
			}
	},
		
	salvar: function(){
			var valores = [];
			var fields = [];
			var valores = FormView.getForm().getValues();
			var fields = FormView.getForm().getFields();
			if(FormView.getForm().isValid()){
			   PanelView.el.mask('Salvando...', 'x-mask-loading');
			   //INSERT
			   if (insert === true){
			  	 Ext.Ajax.request({
				    url: 'php/Insert.php',
				    method: 'POST',
					params: {
						Tablename: tablename,
						Chave: chave,
						Field1: chave,
    	  	 			Val1: val1,    	  	 				 
    	  	 			Fields: Ext.encode(fields.keys),
    	  	 			Valores: Ext.encode(valores),
    	  	 			Length: fields.length
    	  	 		},
					success: function(){
						Ext.ComponentQuery.query('#mygrid')[0].getSelectionModel().clearSelections();
						this.criaGrid();
						PanelView.el.unmask();
						PanelView.hide();
						Ext.Msg.alert('Ok', 'Dados Salvos.');
					},
					failure: function(){
						PanelView.el.unmask();
						Ext.Msg.alert('Erro', 'A operacao falhou.');
					},
					scope: this
				})
			  }
			  //UPDATE
			  if (insert === false){
			  	var record = Ext.ComponentQuery.query('#mygrid')[0].getSelectionModel().getLastSelected();
				var val1 = record.data[chave];
				Ext.Ajax.request({
				    url: 'php/Update.php',
				    method: 'POST',
					params: {
						Tablename: tablename,
						Chave: chave,
						Field1: chave,
    	  	 			Val1: val1,    	  	 				 
    	  	 			Fields: Ext.encode(fields.keys),
    	  	 			Valores: Ext.encode(valores),
    	  	 			Length: fields.length
    	  	 		},
					success: function(){
						Ext.ComponentQuery.query('#mygrid')[0].getSelectionModel().clearSelections();
						this.criaGrid();
						PanelView.el.unmask();
						PanelView.hide();
						Ext.Msg.alert('Ok', 'Dados Salvos');
					},
					failure: function(){
						PanelView.el.unmask();
						Ext.Msg.alert('Erro', 'A operacao falhou.');
					},
					scope: this
				})
			   }
			}else{
				Ext.Msg.alert('Atencao', 'Existem campos invalidos.');
			}
	},
		
	janelaSobre: function(){
		var winSobre = Ext.create('DIAS.view.MyWin', {
			id: 'winesobre',
			layout: 'fit',
			autoScroll: true,
			title: 'Sobre o Aplicativo',
			height: 580,
        	width: 650,
        	modal: true			
		})
		var formSobre = {
				xtype: 'panel',
				autoScroll: true,
				autoLoad: {url:'./resources/html/sobre.html', scripts:true}
       		}
		winSobre.show();	
		winSobre.add(formSobre);
    },

	gerarPDF: function(){
			Ext.Msg.alert('Informacao', 'Esta funcionalidade nao foi adicionada neste modulo.' +
					' Para adicionar esta ou outra funcionalidade envie e-mail para dias@dias.adm.br' +
					' ou envie mensagem pelo formulario de contato do site www.dias.adm.br');	
	},
			
	cancelar: function(){
			GPanel.show();
			Ext.ComponentQuery.query('#mygrid')[0].doLayout();
	}
});