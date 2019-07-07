/*
 APLICATIVO GERADOR CRUD ExtJs/Php/Mysql.
 Desenvolvido por AMARILDO DIAS
 dias@dias.adm.br
 http://www.dias.adm.br
 */
Ext.define('DIAS.store.StoreConfig', {
    extend: 'Ext.data.Store',
    
    constructor: function(cfg) {    
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
        storeId: 'StoreConfig',
        proxy: {
             type: 'ajax',
             url: './php/json/Config.json',
             reader: {
                  type: 'json'
                  //root: 'data'
             }
        },
        fields: []
        }, cfg)]);
  	}
});