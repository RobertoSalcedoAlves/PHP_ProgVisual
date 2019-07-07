/*
 APLICATIVO GERADOR CRUD ExtJs/Php/Mysql.
 Desenvolvido por AMARILDO DIAS
 dias@dias.adm.br
 http://www.dias.adm.br
 */
Ext.define('DIAS.view.MyWindow', {
    extend: 'Ext.window.Window',
    alias: ['widget.mywindow'],
    
    initComponent: function() {
        var me = this;
        me.items = [{
        	xtype: 'window',
        	name: 'mywindow',
        	id: 'mywindow',
        	modal: 'true',
        	width: 500,
            height: 500,
            items: []               
        }]
        me.callParent(arguments);
    }
});