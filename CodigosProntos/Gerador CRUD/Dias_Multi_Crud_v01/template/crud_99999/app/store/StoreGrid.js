/*
 APLICATIVO GERADOR CRUD ExtJs/Php/Mysql.
 Desenvolvido por AMARILDO DIAS
 dias@dias.adm.br
 http://www.dias.adm.br
 */
Ext.define('DIAS.store.StoreGrid', {
    extend: 'Ext.data.Store',
    
    constructor: function(cfg) {    
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
        storeId: 'StoreGrid',
        pageSize: 10,
        remoteSort: true,
        method: 'GET',
        start: 0,
        limit: 10,
        proxy: {
             type: 'ajax',
             url: './php/Select.php',
             reader: {
                  type: 'json',
                  root: 'dados',
                  totalProperty: 'total'
             }
        },
        fields: []
        }, cfg)]);
  	}
});