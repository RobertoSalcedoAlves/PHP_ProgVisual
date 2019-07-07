/*
 APLICATIVO GERADOR CRUD ExtJs/Php/Mysql.
 Desenvolvido por AMARILDO DIAS
 dias@dias.adm.br
 http://www.dias.adm.br
 */
Ext.define('DIAS.store.StoreTabelas', {
    extend: 'Ext.data.Store',
    
    constructor: function(cfg) {    
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
        	autoLoad: false, 
        	autoSync: false,
        	batchUpdateMode: 'complete',
            storeId: 'StoreTabelas',
            method: 'GET',
            noCache: true,
            proxy: {
                type: 'ajax',
                url: './php/Mydb/JsonListaTabela.php',
                reader: {
                    type: 'json',
                    successProperty: 'success'
                }
            },
            fields: [
                {
                    name: '0'
                }
            ]         
    	}, cfg)]);
  	}
});