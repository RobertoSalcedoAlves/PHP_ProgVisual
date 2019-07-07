/*
 APLICATIVO GERADOR CRUD ExtJs/Php/Mysql.
 Desenvolvido por AMARILDO DIAS
 dias@dias.adm.br
 http://www.dias.adm.br
 */
Ext.define('DIAS.view.MyForm', {
    extend: 'Ext.form.Panel',

    initComponent: function() {
        var me = this;
        me.items = [{
            xtype: 'form',
            items: []
        }];      
        me.callParent(arguments);
    }
});