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
        model: 'DIAS.model.Dados',
     	pageSize: 15,
    	remoteSort: true,
        proxy: {
             type: 'ajax',
             url: './php/Mydb/Select.php',
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