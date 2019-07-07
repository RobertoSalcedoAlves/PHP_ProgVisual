/*
 APLICATIVO GERADOR CRUD ExtJs/Php/Mysql.
 Desenvolvido por AMARILDO DIAS
 dias@dias.adm.br
 http://www.dias.adm.br
 */
Ext.define('DIAS.controller.Crud', { 
    extend: 'Ext.app.Controller',
 
    models: ['Dados'],
    stores: ['StoreDB','StoreTabelas','StoreCampos','StoreGrid','StoreForm'],
    views:  ['layout.MyViewport','MyFunctions','MyTab','MyForm','MyGrid','MyWindow']
     
});
