/*
 APLICATIVO GERADOR CRUD ExtJs/Php/Mysql.
 Desenvolvido por AMARILDO DIAS
 dias@dias.adm.br
 http://www.dias.adm.br
 */
 
//INTERFACE DO USUARIO

Ext.define('DIAS.view.layout.MyView', {
   //extend: 'Ext.container.Viewport',
	extend: 'Ext.window.Window',
    alias: 'widget.myview',
		
    autoScroll: true,
    layout: {
        type: 'border'
    },
        
    initComponent: function() {
        var me = this;
        me.items = [{        
                xtype: 'panel',
                name: 'Menu',
                id: 'menu',
                frame: true,
                width: 250,
                layout: {
                  type: 'accordion'
                },
                collapsible: true,
                collapsed: false,
                title: 'Menu Principal',
                region: 'west',
                split: true,
                items: [
                	{
                        xtype: 'panel',
                        frame: true,
                        name: 'config',
                        collapsed: true,
                        collapsible: true,
                        id: 'config',
                        //layout: 'fit',
                        title	: 'Configuracoes',
                        items: [{
                        	xtype: 'textfield',
                       		name: 'textlinha',
                        	mode: 'local',
                        	editable: false,
                        	id: 'textlinha',
                        	fieldLabel: 'linhas por tela',
                        	labelAlign: 'top',
                        	displayField: '0',
                        	triggerAction:'all',
                        	width: 200,
                          	value: '10',
                        	allowBlank: false
                          },
                          {
                        	xtype: 'panel',
                        	id: 'panelconfig',
                         	frame: true,
    						width: 230,
    						height: 150,
    						autoLoad:{url:'./resources/html/config.html', scripts:true},
    						buttonAlign : 'center',  
    						buttons: [{
                    	         text: 'OK',
                    	        	handler: me.configAplic            	         			
                     	         }]
                          }
                        ]
       
                    },
                    {
                        xtype: 'panel',
                        frame: true,
                        name: 'Crud Gerados',
                        collapsed: false,
                        collapsible: true,
                        id: 'crudger',
                        layout: 'fit',
                        title	: 'Crud Gerados',
                        items: [
                          {
                        	xtype: 'gridpanel',
                        	id: 'gridtabelas',
                        	stripeRows: false,
                			stripeCols: false,
                        	autoScroll: true,
    						width: 230,
    						//height: 400,
    						queryMode:'local',
    						store: 'StoreBase',
    					    selModel: Ext.create('Ext.selection.RowModel', {mode: 'SINGLE'}),
    						columns:[{header: 'Escolha uma tabela', dataIndex: '0', flex: 1}],
                        	listeners: {
                        		scope: me,
                        	   'select': me.defineTabela
                            }   
                          }
                        ]
                    }
                ]            
       			},{
                xtype: 'tabpanel',
                id: 'tbpanel',
                split: true,
                activeTab: 0,
                region: 'center',
                items: [{
                        xtype: 'panel',
                        layout: 'fit',
                        hidden: false,
                        title: 'Escolha uma tabela',
                    	autoScroll: true,
                        name : 'grid',
                        id: 'gpanel',
 			            items: [{                        
                           xtype:'gridpanel',
                           id:'mygrid',
                           columns:[]
                         }],
                        tbar: [{
						text   : 'Adicionar',
						//iconCls: 'btn-add',
						scope  : me,
						handler: me.adicionar
						},{
						text   : 'Editar',
						//iconCls: 'btn-edit',
						scope  : me,
						handler: me.editar
						},{
						text   : 'Deletar',
						//iconCls: 'btn-del',
						scope  : me,
						handler: me.deletar
						},{
						text   : 'Gerar PDF',
						//iconCls: 'btn-pdf',
						scope  : me,
						handler: me.gerarPDF
						},{						
						text   : 'Exportar xls',
						//iconCls: 'btn-pdf',
						scope  : me,
						handler: me.gerarPDF						
						},{																		
						text   : 'Sobre',
						//iconCls: 'btn-grid',
						scope  : me,
						handler: me.janelaSobre	
						},
						{
                        xtype: 'combobox',
                        name: 'Field1',
                        mode: 'local',
                        editable: false,
                        id: 'comboField1',
                        fieldLabel: 'Filtro',
                        labelAlign: 'right',
                        displayField: 'Field',
                        hiddenName: 'Field1',
                        triggerAction:'all',
                        width: 220,
                        //emptyText: 'Selecione',
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
                        triggerAction:'all',
                        width: 50,
                        allowBlank: true,
                        value: '=',
                        store: ['=','>','>=','<','<=','<>']
                        },
                        {
                        xtype: 'textfield',
                        //columnWidth:.5,
                        width: 180,
                        name: 'Argumento1',
                        mode: 'local',
                        id: 'textArgumento1',
                        displayField: 'Text1',
                        triggerAction:'all',
                        allowBlank: true,
                        hiddenName: 'Argumento'
						},{						
						text   : 'Atualizar Grid',
						//iconCls: 'btn-grid',
						scope  : me,
						handler: function (){
								me.criaGrid()
						}
						},{						
						text   : 'Limpar Filtro',
						//iconCls: 'btn-grid',
						scope  : me,
						handler: me.limpaFiltro
						}]
                        
                        },
                        {
                        xtype: 'panel',
                      	hidden: true,
                    	autoScroll: true,
                        name: 'panelview',
                        id: 'panelview',
                        items:[{
                           	xtype: 'form',
                           	frame: true,
                           	layout:'column',
                        	id: 'formview',
                        	title: 'Formulario',
                      	    items: []
                         },{ 
                        	xtype: 'form',
                        	frame: true,
                          	buttonAlign: 'center',
							buttons    : [{
								text   : 'Salvar Registro',
								scope  : me,
								handler: me.salvar
								},{
								text   : 'Voltar',
								scope  : me,
								handler: me.cancelar
							    },{
								text   : 'Gerar PDF',
								scope  : me,
								handler: me.gerarPDF
							}]
		                }]
                    },{
                        xtype: 'panel',
                        id: 'panelrel',
                        name: 'panelrel',
                        autoScroll: true,
                        hidden: true,
                        layout: 'fit',
                        frame: true,
                        title: 'Visualizando Relatorio',
                        items: [{
                           	xtype: 'panel',
                           	frame: true,
     						layout: 'fit',
                           	id: 'pdfview',
                           	autoScroll: true,
                           	items: [{
                      	    	html: '<object width="100%" height="100%" type="application/pdf" data="./php/MyPdf/relatorio.pdf"></object>'
                            }],
                            buttonAlign: 'center',
							tbar       : [{
								text   : '<< Voltar',
								scope  : me,
								handler: me.cancelar
							},{
								text   : 'Atualizar',
								scope  : me,
								handler: me.atualizaRelatorio
							}]
                       }]
            		}
                 ]
                 
   	         }
        ]; 
    me.callParent(arguments);
    }
});