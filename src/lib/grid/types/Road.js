import * as PIXI from 'pixi.js';
import {App} from 'App';
import {Generic} from 'grid/types/Generic'
import {Transform} from 'grid/Transform';
import {Texture} from 'grid/Texture';
import {Tile} from 'grid/Tile';

export class Road extends Generic{
	
	constructor(sprite){
		super(sprite);

		this.on('enable', this.__onEnable)
		this.on('disable', this.__onDisable)
		this.on('update', this.__onUpdate)
		this.on('update-position', this.__onUpdatePosition )


	}

	__onEnable(){}

	__onDisable(){
		if( this.sprite.mask ){
			this.sprite.mask.destroy();
			this.sprite.mask = null;
		}
		this.sprite.parent.sortableChildren = false;
	}

	__onUpdate(){
		this.cc = {top:undefined,right:undefined,bottom:undefined,left:undefined};
		if( this.textureData.crop ){
			this.sprite.mask = this.sprite.addChild( new PIXI.Graphics() );
		}
		Transform.transform( this.sprite, this.textureData.size, this.textureData.skewX, this.textureData.skewY);
		this.sprite.anchor.set( 0.5, 0.5 );

		if( this.textureData.images.build ){

			this.sprite.parent.sortableChildren = true;
			this.addDerivate('build');

			this.derivates.build.texture = Texture(this.textureData, 'build');
			this.derivates.build.type = 'build';
			this.derivates.build.zIndex = 1;
			this.sprite.parent.addChild( this.derivates.build );

			Transform.transform( this.derivates.build, this.textureData.size, false, false);
			this.derivates.build.anchor.set( .5, 1 );

		}else{
			this.sprite.sortableChildren = true;
		}
		this.updateConnections();
	}

	__onUpdatePosition(){
		this.updateConnections();
	}




	updateConnections(tile = this.tile, selection = this.selection){
		
		if( !tile ) return;

		this.sprite.x = tile.x;
		this.sprite.y = tile.y;

		

		if( this.derivates.build ){
			this.derivates.build.x = tile.x;
			this.derivates.build.y = tile.y + Tile.halfHeight;
		}

		let connect = {top:false,bottom:false,left:false,right:false};
		selection.forEach( (alt,i,a) => {
			if( alt !== tile ){
				connect.top 	= connect.top 		|| ( tile.cx === alt.cx && tile.cy === alt.cy+1),
				connect.bottom 	= connect.bottom 	|| ( tile.cx === alt.cx && tile.cy === alt.cy-1),
				connect.left 	= connect.left 		|| ( tile.cy === alt.cy && tile.cx === alt.cx+1),
				connect.right 	= connect.right 	|| ( tile.cy === alt.cy && tile.cx === alt.cx-1)
			}
		});

		if( this.textureData.crop ){
			this.mask(connect);
		}


		

	}
	

	mask(sides){

		var requiresUpdate = (	sides.top 		!== this.cc.top || 
								sides.right 	!== this.cc.right || 
								sides.bottom 	!== this.cc.bottom ||
								sides.left		!== this.cc.left );
		if( requiresUpdate ){

			if( !this.mask ){
				console.warn('mask missing');
				return;
			}
			
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
			tile.neighbours().forEach( (v,i,a) => {
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