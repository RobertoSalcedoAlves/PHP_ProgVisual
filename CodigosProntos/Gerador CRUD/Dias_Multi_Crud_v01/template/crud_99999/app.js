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
Ext.Loader.setConfig({
    enabled: true
});

Ext.require([
	'Ux.CpfField',
	'Ux.CnpjField',
	'Ux.InputTextMask',
	'Ux.FieldMoney',
	'Ux.Uppercase'
]);

Ext.create('Ext.app.Application', {
 
    name: 'DIAS',
    autoCreateViewport: false,
    controllers: ['MyApp'],
  
    launch: function() {
        Ext.QuickTips.init();        
        var cmp1 = Ext.create('DIAS.view.MyFunc', {
        	name: 'mywin',
        	id: 'mywin',
        	modal: 'true',
        	maximizable: 'true',
        	maximized: true,
        	title: 'Dias_Crud Application',
        	width: 1000,
            height: 600,
            renderTo: Ext.getBody()
        }); 
        FormView = Ext.ComponentQuery.query('#formview')[0];
    	PanelView = Ext.ComponentQuery.query('#panelview')[0];
    	GPanel = Ext.ComponentQuery.query('#gpanel')[0];
    	ComboField1 = Ext.ComponentQuery.query('#comboField1')[0];
    	ComboCond1 = Ext.ComponentQuery.query('#comboCondicao1')[0];
    	TextArg1 = Ext.ComponentQuery.query('#textArgumento1')[0];
    	ComboTab = Ext.ComponentQuery.query('#combotab')[0];
    	CrudGer = Ext.ComponentQuery.query('#crudger')[0];
    	Linhas = Ext.ComponentQuery.query('#textlinha')[0];
    	Config = Ext.ComponentQuery.query('#config')[0];
    	CrudGer = Ext.ComponentQuery.query('#crudger')[0];
        cmp1.show();
    }
    
 });