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
		if( this.mask ){
			this.mask.destroy();
			this.mask = null;
		}
		if( this.parent ) this.parent.sortableChildren = false;
	}

	__onUpdate(){
		this.cc = {top:undefined,right:undefined,bottom:undefined,left:undefined};
		if( this.textureData.crop ){
			this.mask = this.addChild( new PIXI.Graphics() );
		}
		Transform.transform( this, this.textureData.size, this.textureData.skewX, this.textureData.skewY);
		this.anchor.set( 0.5, 0.5 );

		if( this.textureData.images.build ){

			this.parent.sortableChildren = true;
			this.addDerivate('build');

			this.derivates.build.texture = Texture(this.textureData, 'build');
			this.derivates.build.type = 'build';
			this.derivates.build.zIndex = 1;
			this.parent.addChild( this.derivates.build );

			Transform.transform( this.derivates.build, this.textureData.size, false, false);
			this.derivates.build.anchor.set( .5, 1 );

		}else{
			this.sortableChildren = true;
			this.destroyAllDerivates();
		}
		this.updateConnections();
	}

	__onUpdatePosition(){
		this.updateConnections();
	}




	updateConnections(tile = this.tile, selection = this.selection){
		
		if( !tile ) return;

		this.x = tile.x;
		this.y = tile.y;

		

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
			this.draw_mask(connect);
		}




		// HANDLE ROAD SPECIALS
		if( this.derivates.build ){

			this.surfaceOffset = this.textureData.orig.height - this.textureData.cutoff;

			var s, inverse, count = 0,
				texture = Texture(this.textureData, 'build');
			for(s in connect ){ if( connect[s] ) count++; }
			if( count === 1 ){
				for(s in connect ){
					inverse = {top:'bottom',right:'left',bottom:'top',left:'right'}[s];
					if( connect[s] && this.textureData.images['start_' + inverse] ){
						texture = Texture(this.textureData, 'start_' + inverse);
						this.surfaceOffset = (this.textureData.orig.height - this.textureData.cutoff) * 0.5;
					}
				}
			}
			this.derivates.build.texture = texture;
			//console.log('Road.updateConnections', this.tile.toString(), this.surfaceOffset);


			

		}


		

	}
	

	draw_mask(sides){

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
			
			let radius = this.texture.width * 0.33;
			
			// DRAW
			this.mask.clear();
			this.mask.beginFill(0xffff00,1);
			this.mask.drawCircle(0,0, radius);
			if( this.cc.top 	) this.mask.drawRect(-radius,-radius*2,radius*2,radius*2);
			if( this.cc.right 	) this.mask.drawRect(0,-radius,radius*2,radius*2);
			if( this.cc.bottom 	) this.mask.drawRect(-radius,0,radius*2,radius*2);
			if( this.cc.left 	) this.mask.drawRect(-radius*2,-radius,radius*2,radius*2);
			this.mask.endFill();





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
					roadSprite.updateConnections(tile, array)
				});
			});

		}
	
	}
}


import {HotModule} from 'HotModule.js'
HotModule(module, Road );