import * as PIXI from 'pixi.js';
import {App} from 'App';
import {Tile} from 'grid/Tile';

export class Fence{
	
	constructor(sprite){
		this.sprite = sprite;
		this.enabled = true;
	}

	get enabled(){ return this._enabled }
	set enabled(bool){
		if( bool !== this.enabled ){
			
			this._enabled = bool;
			this.cc = {top:false,right:false,bottom:false,left:false};
			
			if( !bool ){
				this.clear();
			}else{
				if( !this.sprite.mask )	this.sprite.mask = new PIXI.Graphics();
				if( !this.sprite.mask.parent ) this.sprite.addChild( this.sprite.mask );

				if( !this.sprite.bottomConnector ) this.sprite.bottomConnector = new PIXI.Sprite(this.sprite.texture);
				if( !this.sprite.bottomConnector.parent ) this.sprite.parent.addChild( this.sprite.bottomConnector);
				if( !this.sprite.bottomConnector.mask ) this.sprite.bottomConnector.mask = new PIXI.Graphics();
				if( !this.sprite.bottomConnector.mask.parent ) this.sprite.bottomConnector.addChild( this.sprite.bottomConnector.mask );

				this.sprite.parent.addChild( this.sprite );

				if( !this.sprite.topConnector ) this.sprite.topConnector = new PIXI.Sprite(this.sprite.texture);
				if( !this.sprite.topConnector.parent ) this.sprite.parent.addChild( this.sprite.topConnector );
				if( !this.sprite.topConnector.mask ) this.sprite.topConnector.mask = new PIXI.Graphics();
				if( !this.sprite.topConnector.mask.parent ) this.sprite.topConnector.addChild( this.sprite.topConnector.mask );


			} 
		}
	}

	clear(){

		console.log('Fence.clear');

		if( this.sprite.mask ){
			this.sprite.mask.destroy();
			this.sprite.mask = null;
		}

	}


	updateConnections(index, selection){

		if( !this.sprite.texture.valid ){
			this.sprite.texture.on('update', ()=>{ this.updateConnections(index, selection) });
			return;
		}

		this.sprite.topConnector.visible = this.cc.top;
		this.sprite.bottomConnector.visible = this.cc.bottom;

		let current = selection[index],
			connect = {top:false,bottom:false,left:false,right:false};

		selection.forEach( (alt,i,a) => {
			if( alt !== current ){
				connect.top 	= connect.top 		|| ( current.cx === alt.cx && current.cy === alt.cy+1),
				connect.bottom 	= connect.bottom 	|| ( current.cx === alt.cx && current.cy === alt.cy-1),
				connect.left 	= connect.left 		|| ( current.cy === alt.cy && current.cx === alt.cx+1),
				connect.right 	= connect.right 	|| ( current.cy === alt.cy && current.cx === alt.cx-1)
			}
		});

		var requiresUpdate = (	connect.top 	!== this.cc.top || 
								connect.right 	!== this.cc.right || 
								connect.bottom 	!== this.cc.bottom ||
								connect.left	!== this.cc.left );

		if( requiresUpdate ){
			//console.log('Fence.mask', current.toString(), connect);

			// CACHE
			this.cc = connect;
			
			if( connect.left || connect.right ){
				this.sprite.visible = true;
				this.sprite.mask.clear();
				this.sprite.mask.beginFill(0xff0000);
				if( connect.right ) this.sprite.mask.drawRect(
					-this.sprite.texture.width*0.0,
					-this.sprite.texture.height,
					this.sprite.texture.width * 0.5,
					this.sprite.texture.height
				);

				if( connect.left ) this.sprite.mask.drawRect(
					-this.sprite.texture.width*0.5,
					-this.sprite.texture.height,
					this.sprite.texture.width * 0.5,
					this.sprite.texture.height
				);
				this.sprite.mask.endFill();
			}else{
				this.sprite.visible = false;
			}


			if( connect.top ){
				this.sprite.topConnector.visible = true;
				this.sprite.topConnector.mask.clear();
				this.sprite.topConnector.mask.beginFill(0xff0000);
				this.sprite.topConnector.mask.drawRect(
					-this.sprite.topConnector.texture.width*0.5,
					-this.sprite.topConnector.texture.height,
					this.sprite.topConnector.texture.width * 0.5,
					this.sprite.topConnector.texture.height
				);
			}else{
				this.sprite.topConnector.visible = false;
			}


			if( connect.bottom ){
				this.sprite.bottomConnector.visible = true;
				this.sprite.bottomConnector.mask.clear();
				this.sprite.bottomConnector.mask.beginFill(0xff0000);
				this.sprite.bottomConnector.mask.drawRect(
					-this.sprite.bottomConnector.texture.width*0.0,
					-this.sprite.bottomConnector.texture.height,
					this.sprite.bottomConnector.texture.width * 0.5,
					this.sprite.bottomConnector.texture.height
				);
			}else{
				this.sprite.bottomConnector.visible = false;
			}


		}
		
	}
	

	
	static mixin(sprite){
		sprite.fence = new Fence(sprite);
		return sprite;
	}


	static recursiveConnect(tile, array = []){
		
		let rootNode = (array.length === 0 )

		if( array.indexOf(tile) === -1 ){
			
			// PUSH START-TILE
			if( tile.content.contains('fence') ){
				array.push(tile);
			}
			
			// CHECK MY NEIGHBOURS
			[
				App.Grid.getTile({x:tile.cx+1, 	y:tile.cy	}),
				App.Grid.getTile({x:tile.cx-1, 	y:tile.cy	}),
				App.Grid.getTile({x:tile.cx, 	y:tile.cy+1	}),
				App.Grid.getTile({x:tile.cx, 	y:tile.cy-1	})
			].forEach( (v,i,a) => {
				if( v && v.content.contains('fence') ){
					Fence.recursiveConnect(v, array );
				}
			});
		}

		if( rootNode ){
			// CREATE ALL CONNECTIONS
			array.forEach( (tile,index) => {
				tile.content.getSprites('fence').forEach( (fenceSprite) => {
					fenceSprite.fence.updateConnections(index, array)
				});
			});

		}
	
	}
}


import {HotModule} from 'HotModule.js'
HotModule(module, Fence );