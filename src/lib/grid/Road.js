import * as PIXI from 'pixi.js';
import {App} from 'App';

export class Road{
	
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
				// CLEAR ALL MASKING
				this.clear();
			}else{
				// CONNECTION CACHE
				if( !this.sprite.mask )	this.sprite.mask = new PIXI.Graphics();
				if( !this.sprite.mask.parent ) this.sprite.addChild( this.sprite.mask );
			}
		}
	}
	
	clear(){
		if( this.sprite.mask ){
			this.sprite.mask.destroy();
			this.sprite.mask = null;
		}
	}

	updateConnections(index, selection){

		if( typeof index === 'number' ){

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

			this.mask(connect);

		}

		

	}
	
	


	mask(sides){

		var requiresUpdate = (	sides.top 		!== this.cc.top || 
								sides.right 	!== this.cc.right || 
								sides.bottom 	!== this.cc.bottom ||
								sides.left		!== this.cc.left );
		if( requiresUpdate ){
			// CACHE
			this.cc = sides;

			let radius = this.sprite.texture.width * 0.33;

			// DRAW
			this.sprite.mask.clear();
			this.sprite.mask.beginFill(0xffff00,1);
			this.sprite.mask.drawCircle(0,0, radius);
			if( this.cc.top 	) this.sprite.mask.drawRect(-radius,-radius*2,radius*2,radius*2);
			if( this.cc.right 	) this.sprite.mask.drawRect(0,-radius,radius*2,radius*2);
			if( this.cc.bottom 	) this.sprite.mask.drawRect(-radius,0,radius*2,radius*2);
			if( this.cc.left 	) this.sprite.mask.drawRect(-radius*2,-radius,radius*2,radius*2);
			this.sprite.mask.endFill();

		}
	}
	
	static mixin(sprite){
		sprite.road = new Road(sprite);
		return sprite;
	}


	static recursiveConnect(tile, array = []){
		
		let rootNode = (array.length === 0 )
		

		if( array.indexOf(tile) === -1 ){
			
			// PUSH START-TILE
			array.push(tile);

			// CHECK MY NEIGHBOURS
			[
				App.Grid.getTile({x:tile.cx+1, 	y:tile.cy	}),
				App.Grid.getTile({x:tile.cx-1, 	y:tile.cy	}),
				App.Grid.getTile({x:tile.cx, 	y:tile.cy+1	}),
				App.Grid.getTile({x:tile.cx, 	y:tile.cy-1	})
			].forEach( (v,i,a) => {
				if( v && v.content.contains('road') ){
					Road.recursiveConnect(v, array );
				}
			});
		}
		

		if( rootNode ){

			// CREATE ALL CONNECTIONS
			array.forEach( (tile,index) => {
				tile.content.getSprites('road').forEach( (roadSprite) => {
					roadSprite.road.updateConnections(index, array)
				});
			});
		}
	
	}
}


import {HotModule} from 'HotModule.js'
HotModule(module, Road );