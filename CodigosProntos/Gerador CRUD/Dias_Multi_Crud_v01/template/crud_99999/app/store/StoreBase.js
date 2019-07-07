/*
 APLICATIVO GERADOR CRUD ExtJs/Php/Mysql.
 Desenvolvido por AMARILDO DIAS
 dias@dias.adm.br
 http://www.dias.adm.br
 */
Ext.define('DIAS.store.StoreBase', {
    extend: 'Ext.data.Store',
    
    constructor: function(cfg) {    
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
        storeId: 'StoreBase',
        autoLoad: true,
        proxy: {
             type: 'ajax',
             url: './php/json/base.json',
             reader: {
                  type: 'json',
                  root: 'base'
             }
        },
        fields: [{name: '0'}]         
        }, cfg)]);
  	}
});