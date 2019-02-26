export const ResizeHandler = {
	fn:[],
	context:[],
	init:true,
	set source(object){
		this._source = object;
		if( this.init ){
			window.addEventListener('resize', _.debounce( (e)=>{
				ResizeHandler.trigger();
			}, 200) );
		}
	},
	add:function(fn, context){
		if( this.fn.indexOf(fn) === -1 ){
			this.fn.push(fn);
			this.context.push(context);
		} 
	},
	remove:function(fn){
		let index = this.registry.indexOf(fn);
		if( index >= 0 ){
			this.fn.splice(index,1);
			this.context.splice(index,1);
		}
	},
	trigger:function(){
		if( !this.init ) return;
		if( window.console ) console.log('ResizeHandler.trigger', this._source);
		for(var i=0;i<this.fn.length;i++){
			this.fn[i].call(this.context[i], this._source);
		}
	}
}