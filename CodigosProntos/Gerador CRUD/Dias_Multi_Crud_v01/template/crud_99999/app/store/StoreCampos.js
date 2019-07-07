/*
 APLICATIVO GERADOR CRUD ExtJs/Php/Mysql.
 Desenvolvido por AMARILDO DIAS
 dias@dias.adm.br
 http://www.dias.adm.br
 */
Ext.define('DIAS.store.StoreCampos', {
    extend: 'Ext.data.Store',
    
    constructor: function(cfg) {    
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
        	autoLoad: false, 
        	autoSync: false,
        	batchUpdateMode: 'complete',
            storeId: 'StoreCampos',
            method: 'GET',
            proxy: {
                type: 'ajax',
                url: './php/ListaCampos.php',
                reader: {
                   type: 'json',
                   successProperty: 'success'
               }
            },
            fields: [
                {
                   name: 'Field'
                }
            ]            
   	 	}, cfg)]);
  	}
});