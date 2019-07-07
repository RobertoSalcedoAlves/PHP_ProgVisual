/*
 APLICATIVO GERADOR CRUD ExtJs/Php/Mysql.
 Desenvolvido por AMARILDO DIAS
 dias@dias.adm.br
 http://www.dias.adm.br
 */
Ext.define('DIAS.model.Dados', {
    	extend: 'Ext.data.Model',
     	proxy: {
             type: 'ajax',
             url: ''             
        }
});

