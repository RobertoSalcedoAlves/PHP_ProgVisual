/*
 APLICATIVO GERADOR CRUD ExtJs/Php/Mysql.
 Desenvolvido por AMARILDO DIAS
 dias@dias.adm.br
 http://www.dias.adm.br
*/
Ext.define('DIAS.controller.MyApp', { 
    extend: 'Ext.app.Controller',
 
    models: ['MyDados'],
    stores: ['StoreGrid','StoreConfig','StoreCampos','StoreBase'],
    views:  ['layout.MyView','MyFunc','MyForm','MyGrid','MyWin']
     
});