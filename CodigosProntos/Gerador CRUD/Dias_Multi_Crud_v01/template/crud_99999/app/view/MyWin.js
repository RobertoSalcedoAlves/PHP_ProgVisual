/*
 APLICATIVO GERADOR CRUD ExtJs/Php/Mysql.
 Desenvolvido por AMARILDO DIAS
 dias@dias.adm.br
 http://www.dias.adm.br
 */
Ext.define('DIAS.view.MyWin', {
    extend: 'Ext.window.Window',
    
    initComponent: function() {
        var me = this;
        me.items = [{
        	xtype: 'window',
            items: []               
        }]
        me.callParent(arguments);
    }
});