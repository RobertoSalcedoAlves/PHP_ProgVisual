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
    controllers: ['Crud'],
  
    launch: function() {
        Ext.QuickTips.init();        
        var cmp1 = Ext.create('DIAS.view.MyFunctions', {
            renderTo: Ext.getBody()
        });
        cmp1.show();
    }
    
 });