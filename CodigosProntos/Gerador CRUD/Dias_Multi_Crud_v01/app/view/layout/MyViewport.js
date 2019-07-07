/*
 APLICATIVO GERADOR CRUD ExtJs/Php/Mysql.
 Desenvolvido por AMARILDO DIAS
 dias@dias.adm.br
 http://www.dias.adm.br
 */
 
//INTERFACE DO USUARIO

Ext.define('DIAS.view.layout.MyViewport', {
    extend: 'Ext.container.Viewport',
    alias: 'widget.myviewport',
		
    autoScroll: true,
    layout: {
        type: 'border'
    },
    
    initComponent: function() {
        var me = this;
        me.items = [
            {
                xtype: 'panel',
                name: 'origemdados',
                id: 'origemdados',
                frame: true,
                width: 250,
                layout: {
                  type: 'accordion'
                },
                collapsible: true,
                collapsed: false,
                title: 'Origem de dados',
                region: 'west',
                split: true,
                items: [
                    {
                        xtype: 'panel',
                        frame: true,
                        name: 'panelconect',
                        collapsed: false,
                        collapsible: true,
                        id: 'panelconect',
                        title	: 'Conexao Mysql',
                        items: [{      
                                	xtype: 'panel',
                                	name: 'conectDB',
                                	id: 'conectDB',
                                	frame:true,
                                   	//title: 'Dados para Conexao com Mysql', 
                                   	buttonAlign : 'center',                    	
                                   	items: [{
                                   		xtype: 'form',
                                		name: 'Conexao',
                                		id: 'Conexao',      
                                		frame:true,
                                   		buttonAlign : 'left',
                                   		autoLoad:{url:'./resources/html/conexao.html', scripts:true}
                                   	}],
                    	         		buttons: [{
                    	         		 text: 'Testar',
                    	         		 handler: me.testaConexaoMysql                	         			
                     	         		},
                    	         		{
                    	         		text: 'Iniciar >>',
                    	         		handler: me.conectaDB
                    	         	}]
                    	        }]
                        },{
                        xtype: 'panel',
                        frame: true,
                        collapsed: true,
                        collapsible: false,
                        hidden: false,
                        name: 'paneledittabelas',
                        id: 'paneledittabelas',
                        title: 'Editar/Criar --> Tabelas',
                        items: [
                                {      
                                	xtype: 'form',
                                	name: 'ListaDBtab',
                                	id: 'listaDBtab',
                                	frame:true,
                                   	buttonAlign: 'center',
                                   	items: [
                                  	         {
                                	        	 xtype: 'combobox',
                                	        	 //columnWidth:.5,
                                	        	 width: 180,
                                	        	 name: 'Database',
                                	        	 mode: 'local',
                                	        	 readOnly: true,
                                	        	 id: 'databasetab',
                                   	        	 fieldLabel: 'Banco de Dados Selecionado',
                                   	        	 labelAlign: 'top',
                                	        	 displayField: 'Database',
                                	        	 hiddenName: 'Database',
                                	        	 triggerAction:'all',
                                	        	 emptyText: 'Selecione o DB',
                                         	     store: 'StoreDB',
                                         	     queryMode:'local',
                                         	     allowBlank:false
                                    	        },                                   	   
                                   	            {
                                        	    xtype: 'combobox',
                                         	    width: 180,
                                        	    name: 'Tabelas',
                                        	    mode: 'local',
                                        	    editable: false,
                                        	    id: 'tabelastab',
                                        	    emptyText: 'Selecione a Tabela',
                                        	    fieldLabel: 'Escolha a tabela', 
                                        	    labelAlign: 'top',
                                        	    displayField: '0',
                                        	    hiddenName: '0',
                                        	    triggerAction:'all',
                                        	    allowBlank:false,
                                        	    store: 'StoreTabelas',
                                        	    queryMode:'local',
                                        	    listeners:{
         											scope: me,
         											'select': me.carregaCamposTab
         										}
         							        }]         							      
                                 		},
                                 		{
                                 		xtype: 'panel',
                                		name: 'edittabelas',
                                		id: 'edittabelastab',      
                                		frame:true,
                                   		buttonAlign : 'center',
                                   		autoLoad:{url:'./resources/html/opTabelas.html', scripts:true},
                    	         		buttons: [{
                    	         		 	text: 'Criar Tabela',
                    	         		 	handler: me.criaTabelas                	         			                  	         		
                     	         		},{
                    	         		 	text: 'Editar Tabela',
                    	         		 	handler: me.editTabelas                	         			                  	         		
                     	         		}]
                               	  }
                          ]
                      }, 
                    {
                        xtype: 'panel',
                        frame: true,
                        collapsed: true,
                        collapsible: true,
                        hidden: false,
                        name: 'paneltabelas',
                        id: 'paneltabelas',
                        title: 'DB/Tabelas --> CRUD', 
                        items: [
                                {      
                                	xtype: 'form',
                                	name: 'ListaDB',
                                	id: 'listaDB',
                                	frame:true,
                                   	buttonAlign: 'center',
                                   	items: [
                                  	     {
                                	     xtype: 'combobox',
                                	     //columnWidth:.5,
                                	     width: 210,
                                	     name: 'Database',
                                	     mode: 'local',
                                	     editable: false,
                                	     id: 'database',
                                   	     fieldLabel: 'Selecione o Banco de Dados',
                                   	     labelAlign: 'top',
                                	     displayField: 'Database',
                                	     hiddenName: 'Database',
                                	     triggerAction:'all',
                                	     emptyText: 'Selecione o DB',
                                         store: 'StoreDB',
                                         queryMode:'local',
                                         allowBlank:false,
                                         listeners:{
         									scope: me,
         									'select': me.carregaTabelas
										}
                                   	    },                                   	   
                                   	    {                                           
                            			xtype: 'gridpanel',
                            			id: 'gridTabelas',
                            			//hidden: true,
                             			columnLines: true,
                           				frame: true,
                           				width: 210,
                           				height: 250,
                           				autoScroll: true,
                           				title: 'Escolhas as tabelas',
                           				loadMask: true,
                    					queryMode:'local',
                    					buttonAlign : 'center',
                         		  		store: 'StoreTabelas',
                         		  		selModel: Ext.create('Ext.selection.CheckboxModel', {mode: 'MULTI', checkOnly: true}),
                           				columns:[
                               	 		  {header: 'Todas as tabelas',  sortable: true, dataIndex: '0' , flex: 1}
                               	 		]
                                    	}],
         							        buttons: [{
                           	         		 text: '<< Reiniciar',
                           	         		 handler: me.reiniciaAlteraTema
                             	         	},
                           	         		{
                           	         		 text: 'Proximo >>',
                           	         		 handler: function () {
                           	         		 	me.opcoesParaGer()
                           	         		 }
                           	         	    }]
                                       }
                            ]
                    }
                ]
            },
            {
                xtype: 'panel',
                frame: true,
                width: 250,
                collapsible: true,
                collapsed: false,
                name:'panelcontrole',
                id: 'panelcontrole',
                title: 'Painel de Controle',
                split: true,
                region: 'east',
                layout: {
                  type: 'accordion'
                },
                items: [{                           
                        xtype: 'panel',
                        name: 'panelhead3',
                        id: 'panelhead3',
                        collapsible: true,
                        title: 'Temas',
                        frame:true,
                        items: [{
                       		xtype: 'form',
                       		split: true,
                       		frame: true,
                       		buttonAlign : 'center',     
                       		items: [{
                         		xtype: 'combobox',
                        		width: 180,
                        		align : 'rigth',
                  				name: 'temas',
                        		mode: 'local',
                        		editable: false,
                        		id: 'temas',
                        		value: 'Tema1',
                        		labelAlign: 'top',
                        		fieldLabel: 'Alterar o tema',
                        		hiddenName: 'temas',
                         		emptyText: 'Selecione',
                        		store: ['Tema1','Tema2'],
                        		allowBlank:true                       		
   					 		}],
   					 		buttons: [{
                            	text: 'Ok',
                            	handler: me.reiniciaAlteraTema
   							}]
                           }]
   					    },{      
                        xtype: 'panel',
                        name: 'panelmodulos',
                        id: 'panelmodulos',
                        title: 'Modulos CRUD',
                        collapsible: true,
                        collapsed: false,
                        frame:true,
                        items: [{                                                
                        	xtype: 'form',
                        	split: true,
                        	frame: true,
                        	buttonAlign : 'center',     
                        	items: [{
                         		xtype: 'textfield',
                        		width: 180,
                        		align : 'rigth',
                  				name: 'opmodulos',
                        		readOnly: true,
                        		id: 'opmodulos',
                        		value: '',
                        		labelAlign: 'top',
                        		fieldLabel: 'Modulo Gerado',
                         		emptyText: 'Gere o modulo',
                        		allowBlank: true                       		
   						 	}],
   						 	buttons: [{
                    	        text: 'Visualizar',
                    	        handler: me.visualizaModulo
   						 	}]                        
                        
                        },{
                    		xtype: 'panel',
                    		frame: true,
                    		hidden: false,
                    		autoScroll: true,
                    		name: 'ModPanel',
                    		id: 'ModPanel',
                    		split: true,
                    		autoLoad:{url:'./resources/html/modulos.html', scripts:true}
   						}]
                     }]
            },
            {
                xtype: 'panel',
                id: 'cabepanel',
                frame: true,
                height: 130,
                title: 'Gerador dinamico de CRUD Extjs',
                collapsible: true,
                layout: 'fit',
                region: 'north',
                items: [{
                   html: '<object width="100%" height="100%" data="./resources/html/logo.html"></object>'
                }]
            },
            {
                xtype: 'panel',
                frame: true,
                id: 'rodapanel',
                height: 115,
                collapsible: true,
                layout: 'fit',
                region: 'south',
                items: [{
                   html: '<object width="100%" height="100%" data="./resources/html/rodape.html"></object>'
                }]
            },
            {
                xtype: 'tabpanel',
                //frame: true,
                id: 'tbpanel',
                split: true,
                activeTab: 0,
                region: 'center',
                items: [	                        
                    {
                    	xtype: 'panel',
                    	frame: true,
                    	hidden: false,
                    	autoScroll: true,
                    	name: 'ConnPanel',
                    	id: 'connPanel',
                    	name : 'Conexao',
                    	title: 'Conectar Mysql',
                    	split: true,
                    	//layout: 'fit',
                    	autoLoad:{url:'./resources/html/conectar.html', scripts:true}
                   
                    },
                    {
                        xtype: 'panel',
                        id: 'panelDB',
                        name: 'PanelDB',
                        autoScroll: true,
                        hidden: true,
                        frame: true,
                        split: true,
                        title: 'Escolher Banco de Dados',
                        //layout: 'fit',
                        autoLoad:{url:'./resources/html/tabela.html', scripts:true}
            		}, 
            		{            		
                        xtype: 'panel',
                        id: 'panelopcoes',
                        name: 'PanelOpcoes',
                        autoScroll: true,
                        hidden: true,
                        frame: true,
                        split: true,
                        title: 'Opcoes para gerar o aplicativo',
                        items:[
                        {
                        	xtype: 'panel',
                        	autoScroll: true,
                            frame: true,
                        	split: true,
                        	buttonAlign: 'center',
                        	autoLoad:{url:'./resources/html/ger_opcoes.html', scripts:true},
                        	buttons: [{
                           	text: '1-Modo Rapido',                            	         		
                           	handler: function () {                 			
                             	me.defineTabela();
                           	}
                           	},
                           	{
                           	text: '2-Modo Passo a Passo',
                             	handler: function () {
                             		me.passoPasso()   
                             	}
                       		}]                        
                        }]
                        
            		
            		},
            		{
                        xtype: 'panel',
                        id: 'panelGrid',
                        autoScroll: true,
                        hidden: true,
                        frame: true,
                        title: 'Escolha os Campos da Grid',
                        items: [{      
                                	xtype: 'form',
                                	name: 'formChave',
                                	id: 'formchave',
                                	frame: true,
                                	title: 'Escolha um campo chave', 
                                   	items: [{
                                	        xtype: 'combobox',
                                	        //columnWidth:.5,
                                	        width: 300,
                                	        name: 'Chave',
                                	        mode: 'local',
                                	        editable: false,
                                	        id: 'campochave',
                                   	        fieldLabel: 'Campo chave',
                                	        displayField: 'Field',
                                 	        triggerAction:'all',
                                	        emptyText: 'Escolha um campo chave',
                                         	store: 'StoreCampos',
                                           	queryMode:'local',
                                         	allowBlank:true
                                   	   }]
                                    },
                                	{      
                                	xtype: 'panel',
                                	name: 'FormGridCampos',
                                	id: 'formGridCampos',
                                	layout: 'fit',
                                	frame: true,
                                   	title: 'Escolha os campos que formarao a Grid e o Formulario do CRUD', 
                                   	buttonAlign: 'left',
                                   	items: [
                           	      		{                        
                            			xtype: 'gridpanel',
                            			id: 'gridCampos',
                             			columnLines: true,
                           				frame: true,
                           				loadMask: true,
                           				autoScroll: true,
                    					autoSizeColumns: true,
                    					autoSizeGrid: true,
                    					queryMode:'local',
                         		  		store: 'StoreCampos',
                         		  		selModel: Ext.create('Ext.selection.CheckboxModel', {mode: 'MULTI', checkOnly: true}),
                           				plugins: [Ext.create('Ext.grid.plugin.CellEditing', {
                           					clicksToEdit: 1
                          				})],
                           				columns:[
                               	 		  {header: 'column',  sortable: true, dataIndex: 'Field', flex: 1},
                               	 		  {header: 'key',  sortable: true, dataIndex: 'Key', flex: 1},
                               	 		  {header: 'fieldlabel',  sortable: true, dataIndex: 'Rotulo', field: { xtype: 'textfield', allowBlank:false, editable: true}, flex: 1},
                               	 		  {header: 'xtype',  sortable: true, dataIndex: 'Controle', field: {xtype: 'combobox', allowBlank:false, editable: false, store: ['textfield', 'combobox', 'cpffield', 'cnpjfield', 'field-money', 'datefield', 'textarea']}, flex: 1},
                               	 		  {header: 'store',  sortable: true, dataIndex: 'Storecb', field: {xtype: 'combobox', allowBlank:true, editable: true, store: [ '["sim","nao"]', '["opcao 1","opcao 2"]', '["true","false"]']}, flex: 1},
                               	 		  {header: 'vtype',  sortable: true, dataIndex: 'Validacao', field: {xtype: 'combobox', allowBlank:true, editable: true, store: ['email', 'url', 'alpha', 'alphanum']}, flex: 1},
                               	 		  {header: 'width',  sortable: true, dataIndex: 'Tamanho', field: { xtype: 'combobox', allowBlank: false, editable: true, store: ['100', '200', '300', '400', '500', '600', '700', '800']},  flex: 1},
                               	 		  //{header: 'plugin',  sortable: true, dataIndex: 'Plug', field: { xtype: 'combobox', allowBlank: false, editable: true, store: ['[new Ux.Uppercase()]','[new Ux.InputTextMask("999.999.999-99")]','[new Ux.InputTextMask("99.999.9999/9999-99")]','[new Ux.InputTextMask(99999-999)]','[new Ux.InputTextMask("(99)9999-9999"]']}, flex: 1},
                               	 		  {header: 'hidden',  sortable: true, dataIndex: 'Invisivel', field: { xtype: 'combobox', allowBlank: false, editable: true, store: [true, false]}, flex: 1},
                               	 		  {header: 'allowBlank',  sortable: true, dataIndex: 'Nulo', field: { xtype: 'combobox', allowBlank: false, editable: true, store: [true, false]}, flex: 1},
                               	 		  {header: 'readOnly',  sortable: true, dataIndex: 'SoLeitura', field: { xtype: 'combobox', allowBlank: false, editable: true, store: [true, false]}, flex: 1},
                               	 		  {header: 'maxLength',  sortable: true, dataIndex: 'Maximo', field: { xtype: 'textfield', allowBlank:false, editable: true}, flex: 1}
                               	 		]} 
                                     ],
                                     
                                   	 buttonAlign: 'center',
                                  	 buttons: [
                                  	 	 {
                            	         text: '<< Tabela Anterior',                            	         		
                            	         handler: function () {                 			
                             			 	me.voltarTabela()
                            	         }
                             	         },
                             	         {                             	         
                             	         text: 'Pre visualizar',
                            	         handler: function () {
                              	         	me.preVisualiza()                               	         
                            	         }                            	         
                             	         },
                            	         {
                             	         text: 'Gravar e ir para proxima tabela >>',
                            	         handler: function () {
                            	           	me.proximaTabela()                               	         
                            	         }
                            	         },{                            	         
                             	         text: 'Como usar esta GRID?',
                            	         handler: me.helpConfig 
                            	     }]
                             },
                             {
                             xtype: 'panel',
                             id: 'panelcfg',
                        	 name: 'panelcfg',
                          	 autoScroll: true,
                         	 frame: true,
                         	 split: true,
                         	 autoLoad:{url:'./resources/html/configurar.html', scripts:true}
 					    }]
            		},
            		{
                     xtype: 'panel',
                     id: 'paneledittab',
                     name: 'paneledittab',
                     autoScroll: true,
                     hidden: true,
                     frame: true,
                     title: 'Editar Tabelas',
                     items: [{      
                            xtype: 'form',
                            name: 'formcriatabelas',
                            id: 'formcriatabelas',
                            layout: 'column',
                            frame: true,
                            hidden: true,
                            title: 'Criar uma tabela', 
                            items: [{
                                xtype: 'textfield',
                                width: 300,
                                name: 'nometabela',
                                editable: true,
                                id: 'nometabela',
                                emptyText: ' ',
                                fieldLabel: 'Nome da Tabela', 
                                labelAlign: 'left',
                                allowBlank: false
                              }],
                              buttonAlign: 'left',
							  buttons    : [{
								text   : 'Voltar para tabelas',
								scope  : me,
								handler: function(){
									Ext.ComponentQuery.query('#tbpanel')[0].show();
									Ext.ComponentQuery.query('#paneltabelas')[0].expand();
								}
							  },{
								text   : 'Adicionar Campos>>',
								scope  : me,
								handler: me.mostraGridCriarTabela
							}]
                            },
  							{
        					xtype: 'gridpanel', 
        					id: 'gridedittabelas',
							title: 'Editando a Tabela: ',
            				columnLines: true,
            				frame: true,
            				loadMask: true,
            				stripeRows: true,
            				stripeCols: true,
            				autoSizeColumns: true,
            				autoSizeGrid: true,
            				queryMode:'local',
            				store: 'StoreCampos',
            				selType: 'rowmodel',
            				selModel: Ext.create('Ext.selection.RowModel', {mode: 'MULTI'}),
            				plugins: [Ext.create('Ext.grid.plugin.CellEditing', {
            				clicksToEdit: 1
            				})],
                			columns:[
                  				{header: 'Nome do Campo',  sortable: true, dataIndex: 'Field', editor: {xtype: 'textfield', emptyText: 'Nome do campo', allowBlank: false, editable: true}, flex: 1},
                  				{header: 'Tipo(tamanho)',  sortable: true, dataIndex: 'Type', editor: {xtype: 'combobox', emptyText: 'Tipo do campo',allowBlank: false, editable: true, store: ['int(10)', 'varchar(50)', 'text(50)', 'datetime']}, flex: 1},
                   				{header: 'Nulo',  sortable: true, dataIndex: 'Nulo', editor: {xtype: 'combobox', emptyText: 'YES ou NO',allowBlank: false, editable: false, store: ['NO', 'YES']}, flex: 1},
                   				{header: 'Chave',  sortable: true, dataIndex: 'Key', flex: 1},
                  				{header: 'Extra',  sortable: true, dataIndex: 'Extra', flex: 1}
                			],
             				buttonAlign: 'center',
							buttons    : [{
								text   : '<< Voltar',
									scope  : me,
									handler: function(){									 
									 Ext.ComponentQuery.query('#origemdados')[0].expand();
									 Ext.ComponentQuery.query('#paneledittabelas')[0].show();
									 Ext.ComponentQuery.query('#paneltabelas')[0].expand();
									 
									}
								},{
								text   : 'Adicionar um campo',
									scope  : me,
									handler: me.adicionaCampo

								},{
								text   : 'Excluir um campo',
									scope  : me,
									handler: me.removeCampo

								},{
								text   : 'Gravar Alteracoes',
									scope  : me,
									handler: me.salvarTabela
								}]	
                          
                           },
                           {
                           xtype: 'panel',
                           id: 'criartabelahtml',
                           name: 'criartabelahtml',
                           autoScroll: true,
                           hidden: true,
                           frame: true,
                           split: true,
                           layout: 'fit',
                           autoLoad:{url:'./resources/html/criaTabela.html', scripts:true}
            			  },{
                           xtype: 'panel',
                           id: 'editartabelahtml',
                           name: 'editartabelahtml',
                           autoScroll: true,
                           hidden: true,
                           frame: true,
                           split: true,
                           layout: 'fit',
                           autoLoad:{url:'./resources/html/editTabela.html', scripts:true}
            			  }
                        ]
            		   },
            		   {
                        xtype: 'panel',
                        id: 'panelArgumentos',
                        autoScroll: true,
                        frame: true,
                        hidden: true,
                        name : 'listaCampos',
                        title: 'Definir Filtros',
                        items: [{    
                                	xtype: 'form',
                                	frame: true,
                                	name: 'ListaCampos',
                                	id: 'listaCampos',
                                	frame: true,
                                   	title: 'Escolha os filtros para geracao da GRID',
                                   	layout:'column',
                                   	buttonAlign: 'left',
                                   	items: [{
                                	        	 xtype: 'combobox',
                                	        	 //columnWidth:.5,
                                	        	 name: 'Field1',
                                	        	 mode: 'local',
                                	        	 editable: false,
                                	        	 //readOnly: true,
                                	        	 id: 'comboField1',
                                   	        	 fieldLabel: 'Campo',
                                   	        	 labelAlign: 'right',
                                	        	 displayField: 'Field',
                                	        	 hiddenName: 'Field1',
                                	        	 triggerAction:'all',
                                	        	 width: 270,
                                   	        	 emptyText: 'Selecione o campo',
                                         	     store: 'StoreCampos',
                                         	     allowBlank: true,
                                          	     queryMode:'local'
                                         	                                              	     		
                                   	        },                                   	        
                                   	        {
                                	        	 xtype: 'combobox',
                                	        	 name: 'Condicao1',
                                	        	 mode: 'local',
                                	        	 editable: false,
                                	        	 id: 'comboCondicao1',
                                   	        	 fieldLabel: 'Condicao',
                                   	        	 labelAlign: 'right',
                                   	        	 triggerAction:'all',
                                	        	 width: 160,
                                	        	 allowBlank: true,
                                	        	 emptyText: 'Selecione',
                                         	     store: ['=','>','>=','<','<=','!=']
                                         	     		
                                   	        },                                   	        
                                   	        {
                                	        	 xtype: 'textfield',
                                	        	 //columnWidth:.5,
                                	        	 width: 390,
                                	        	 name: 'Argumento1',
                                	        	 mode: 'local',
                                	        	 id: 'textArgumento1',
                                   	        	 fieldLabel: 'Argumento',
                                   	        	 labelAlign: 'right',
                                	        	 displayField: 'Text1',
                                	        	 triggerAction:'all',
                                	        	 allowBlank: true,
                                	        	 hiddenName: 'Argumento'
    										},                                   	        
                                   	        {
                                	        	 xtype: 'button',
                                	        	 name: 'ButtonAdd',
                                	        	 id: 'buttonAdd',
                                	        	 text: 'Adicionar Filtro +',
                                   	        	 displayField: 'ButtonAdd',
                                   	        	 width: 140,
                                	        	 hiddenName: 'Button1',
                                  	        	 handler: me.adicionaFormArgumento5 
                                   	        },                                   	        
                                   	        {
                                	        	 xtype: 'button',
                                	        	 name: 'ButtonClear',
                                	        	 id: 'buttonclear',
                                	        	 text: 'Limpar Filtro',
                                   	        	 displayField: 'Button Clear',
                                   	        	 width: 140,
                                	        	 hiddenName: 'ButtonClear',
                                  	        	 handler: me.limpaFiltro 
                                   	        }
                                       ]
                    				},               				
                     				{    
                                	xtype: 'form',
                                	hidden: true,
                                	name: 'FormArgumento5',
                                	id: 'formArgumento5',
                                	frame: true,
                                   	layout:'column',
                                   	buttonAlign: 'left',
                                   	items: [
                                	         {
                                	        	 xtype: 'combobox',
                                	        	 //columnWidth:.5,
                                	        	 name: 'Field5',
                                	        	 mode: 'local',
                                	        	 editable: false,
                                	        	 id: 'comboField5',
                                   	        	 fieldLabel: 'e Campo',
                                   	        	 labelAlign: 'right',
                                	        	 displayField: 'Field',
                                	        	 hiddenName: 'Field5',
                                	        	 triggerAction:'all',
                                	        	 width: 270,
                                	        	 emptyText: 'Selecione o Campo',
                                	        	 allowBlank: true,
                                         	     store: 'StoreCampos',
                                         	     queryMode:'local'
                                         	     		
                                   	        },
                                   	        {
                                	        	 xtype: 'combobox',
                                	        	 name: 'Condicao5',
                                	        	 mode: 'local',
                                	        	 editable: false,
                                	        	 id: 'comboCondicao5',
                                   	        	 fieldLabel: 'Condicao',
                                   	        	 labelAlign: 'right',
                                  	        	 triggerAction:'all',
                                	        	 width: 160,
                                	        	 emptyText: 'Selecione',
                                	        	 allowBlank: true,
                                         	     store: ['=','>','>=','<','<=','!=']
                                         	     		
                                   	        },
                                   	        {
                                	        	 xtype: 'textfield',
                                	        	 //columnWidth:.5,
                                	        	 width: 390,
                                	        	 name: 'Argumento5',
                                	        	 mode: 'local',
                                	        	 id: 'textArgumento5',
                                   	        	 fieldLabel: 'Argumento',
                                   	        	 labelAlign: 'right',
                                	        	 displayField: 'Text5',
                                	        	 triggerAction:'all',
                                	        	 allowBlank: true,
                                	        	 hiddenName: 'Argumento5'
                                	  
                                   	        },                                   	        
                                   	        {
                                	        	 xtype: 'button',
                                	        	 name: 'ButtonRem5',
                                	        	 id: 'buttonRem5',
                                	        	 text: 'Remover Filtro -',
                                   	        	 displayField: 'ButtonRemove',
                                   	        	 width: 140,
                                	        	 hiddenName: 'Button5',
                                  	        	 handler: me.removeFormArgumento5 
                                   	        } 
                                       ]               				
                    				},
                    				{      
                                	xtype: 'form',
                                	name: 'Processar',
                                	id: 'formProcessar',
                                	url:'./php/Mydb/SqlGen.php',
                                	method: "GET",
                                	frame: true,
                                   	layout:'column',
                                   	buttonAlign: 'center',
                                   	//items: [
                                   	     buttons: [{
                            	         		text: '<< Voltar ',                            	         		
                            	         		handler: function () {                 			
                            						Ext.getCmp('panelGrid').show();
                            	         		   }
                             	         		},
                             	         		{
                             	         		text: 'Proximo >>',
                               	         		handler: 
                               	         			me.criaGrid 
                                	            }
                                          ]
                    				},
                    				{
                        			xtype: 'panel',
                        			id: 'panelfiltros',
                        			name: 'panelfiltros',
                       				autoScroll: true,
                         			frame: true,
                        			//split: true,
                        			//title: 'Como definir filtros',
                        			layout: 'fit',
                        			autoLoad:{url:'./resources/html/filtros.html', scripts:true}
            					  }
                    		 	] 
            		       },        		
             		   {
                        xtype: 'panel',
                        frame: true,
                        layout: 'fit',
                        hidden: true,
                    	autoScroll: true,
                    	//authHeight:true,
                        name : 'grid',
                        id: 'gpanel',
                        title: 'GRID',
                        items: [{                        
                            xtype:'gridpanel',
                            id:'mygrid',
                            stripeRows: true,
                			stripeCols: true,
                			autoSizeGrid: true,
                			autoSizeColumns: true,
                            columns:[]
                        },{
                            xtype: 'panel',
                        	id: 'salvarGrid',
                        	name: 'salvarGrid',
                       		autoScroll: true,
                         	frame: true,
                          	layout: 'fit',
                        	autoLoad:{url:'./resources/html/salvarGrid.html', scripts:true}
            			}],
                        tbar: [{
						text   : 'Ver Form "Adicionar"',
						//iconCls: 'btn-add',
						scope  : me,
						handler: me.adicionar
						},{
						text   : 'Ver Form "Editar"',
						//iconCls: 'btn-edit',
						scope  : me,
						handler: me.editar
						},{						
						text   : 'Gravar e ir para "proxima Tabela"',
						//iconCls: 'btn-edit',
						scope  : me,
						handler: me.proximaTabela
						
						
						}]
                       },
                       {
                        xtype: 'panel',
                        frame: true,
                       	hidden: true,
                    	autoScroll: true,
                        name: 'panelview',
                        id: 'panelview',
                        title: 'Formulario',
                        items:[{
                           	xtype: 'form',
                           	frame: true,
                           	layout:'column',
                        	id: 'formview',
                        	title: 'Formulario',
                      	    items: [{
                      	    	xtype : 'fieldset',
                      	    	id:'myfieldset',
    							title : 'Formulario',
    							layout:'column',
    							autoHeight : true,
    							items : []                      	    
                      	    }]
                         },
                         { 
                        	xtype: 'form',
                        	frame: true,
                          	buttonAlign: 'center',
							buttons    : [{
								text   : 'Voltar para Grid',
								scope  : me,
								handler: me.cancelar
								},{
								text   : 'Voltar para redefinir configuracoes deste formulario',
								scope  : me,
								handler: me.redefinirGrid
							    },{
								text   : 'Gravar e ir para "Proxima Tabela"',
								scope  : me,
								handler: me.proximaTabela
							}]
		                }]
                    }
                 ]
   	         }
        ];
        me.callParent(arguments);
    }
});