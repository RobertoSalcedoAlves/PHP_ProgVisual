/*
 APLICATIVO GERADOR CRUD ExtJs/Php/Mysql.
 Desenvolvido por AMARILDO DIAS
 dias@dias.adm.br
 http://www.dias.adm.br
 */
Ext.define('DIAS.store.StoreForm', {
    extend: 'Ext.data.Store',
    
    constructor: function(cfg) {    
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
        storeId: 'StoreForm',
        model: 'DIAS.model.Dados',
        proxy: {
             type: 'ajax',
             url: './php/Mydb/ConfigForm.php',
             reader: {}
            },
        fields: []
        
        }, cfg)]);
  	}
});