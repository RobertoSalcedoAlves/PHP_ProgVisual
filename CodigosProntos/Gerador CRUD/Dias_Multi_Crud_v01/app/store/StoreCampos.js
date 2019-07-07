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
            storeId: 'StoreCampos',
            proxy: {
                type: 'ajax',
                url: './php/Mydb/JsonListaCampos.php',
                reader: {
                   type: 'json',
                   root: 'config'
                }
            },
            fields: [
                {
                   name: 'Field'
                },{
                   name: 'Type'
                },{
                   name: 'Controle'
                },{
                   name: 'Rotulo'
                },{
                   name: 'Tamanho'
                },{
                   name: 'Storecb'
                },{
                   name: 'Validacao'
                },{
                   name: 'Key'
                },{ 
                   name: 'Extra'
                 },{
                   name: 'Nulo'
                },{
                   name: 'Tam'
                },{
                   name: 'Plug'
                },{
                   name: 'Invisivel'
                },{                
                   name: 'SoLeitura'
                },{                
                   name: 'Maximo'
                }
            ]            
   	 	}, cfg)]);
  	}
});