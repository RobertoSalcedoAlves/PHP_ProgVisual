Ext.define('Ux.Uppercase', {
   extend: 'Ext.util.Observable',
   alias: ['widget.uppercase'],

	init:  function(field) {
		field.on('render',this.onRender,this);
	},
	onRender: function(field) {
		field.el.applyStyles({textTransform: "uppercase"});
		field.el.on('keyup',function() {
			this.setValue(this.getValue().toUpperCase());
		},field);
	}
});