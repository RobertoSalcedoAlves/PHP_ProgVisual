/*
 APLICATIVO GERADOR CRUD ExtJs/Php/Mysql.
 Desenvolvido por AMARILDO DIAS
 dias@dias.adm.br
 http://www.dias.adm.br
 */
Ext.define('DIAS.view.MyGrid', {
    extend: 'Ext.grid.Panel',
        
    initComponent: function() {
        var me = this;
        me.items = [{
        	xtype: 'gridpanel',
        	//store: 'StoreGrid',
            columns:[]
        }];
        me.callParent(arguments);
    }
});