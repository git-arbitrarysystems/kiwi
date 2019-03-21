import * as PIXI from 'pixi.js';
import {App} from 'App';
import {Generic} from 'grid/types/Generic'
import {Transform} from 'grid/Transform';

export class Road extends Generic{
	
	constructor(sprite){
		super(sprite);

		this.on('enable', ()=>{
			this.cc = {top:undefined,right:undefined,bottom:undefined,left:undefined};
			this.sprite.mask = this.sprite.addChild( new PIXI.Graphics() );
		})

		this.on('disable', ()=>{
			this.sprite.mask.destroy();
			this.sprite.mask = null;
		})

		this.on('update', ()=>{
			Transform.transform( this.sprite, this.textureData.size, this.textureData.skewX, this.textureData.skewY);
			this.sprite.anchor.set( 0.5, 0.5 );
			this.updateConnections();
		})

		this.on('update-position', ()=>{
			this.updateConnections();
		})


	}


	updateConnections(tile = this.tile, selection = this.selection){
		
		if( !tile ) return;

		this.sprite.x = tile.x;
		this.sprite.y = tile.y;

		let connect = {top:false,bottom:false,left:false,right:false};
		selection.forEach( (alt,i,a) => {
			if( alt !== tile ){
				connect.top 	= connect.top 		|| ( tile.cx === alt.cx && tile.cy === alt.cy+1),
				connect.bottom 	= connect.bottom 	|| ( tile.cx === alt.cx && tile.cy === alt.cy-1),
				connect.left 	= connect.left 		|| ( tile.cy === alt.cy && tile.cx === alt.cx+1),
				connect.right 	= connect.right 	|| ( tile.cy === alt.cy && tile.cx === alt.cx-1)
			}
		});


		this.mask(connect);

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
	



	static recursiveConnect(tile, array = []){
		
		let rootNode = (array.length === 0 )

		if( array.indexOf(tile) === -1 ){
			
			// PUSH START-TILE
			if( tile.content.contains('road') ){
				array.push(tile);
			}
			
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
					roadSprite.road.updateConnections(tile, array)
				});
			});

		}
	
	}
}


import {HotModule} from 'HotModule.js'
HotModule(module, Road );