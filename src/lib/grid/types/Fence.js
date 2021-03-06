import * as PIXI from 'pixi.js';
import {App} from 'App';
import {Tile} from 'grid/Tile';
import {Generic} from 'grid/types/Generic'
import {Transform} from 'grid/Transform';

export class Fence extends Generic{
	
	constructor(sprite){
		super(sprite);

		this.on('enable', ()=>{
			this.cc = {top:false,right:false,bottom:false,left:false};
			this.mask = this.addChild( new PIXI.Graphics() );
		});

		this.on('disable', ()=>{
			this.mask.destroy({children:true});
			this.mask = null;
		});

		this.on('update', ()=>{
			Transform.transform( this, this.textureData.size, this.textureData.skewX, this.textureData.skewY);
			this.anchor.set(0.5, 1 );
			this.updateDerivates();
			this.updateConnections();			
		});

		this.on('update-position', ()=>{
			this.updateConnections();
		});

	}

	

	updateDerivates(){
		['bottom', 'top'].forEach( (id)=>{
			this.addDerivate(id);
			if( !this.derivates[id].mask ) this.derivates[id].mask = this.derivates[id].addChild( new PIXI.Graphics() );

			this.derivates[id].texture = this.texture;
			this.derivates[id].type = 'fence';
			this.derivates[id].addedZIndex = (id === 'top' ) ? -0.1 : 0.1;

			Transform.transform( this.derivates[id], this.textureData.size, this.textureData.skewX, this.textureData.skewY);
			this.derivates[id].skew.set( this.skew.x, -this.skew.y );
			this.derivates[id].anchor.set(0.5, 1);

		});


		this.clear( this.mask );
		this.clear( this.derivates.top.mask );
		this.clear( this.derivates.bottom.mask );

		// STACK
		var parent = this.parent;
		parent.addChild( this.derivates.top );
		parent.addChild( this );
		parent.addChild( this.derivates.bottom );
		
	}



	updateConnections(tile = this.tile, selection = this.selection){

		if( !tile ) return;

		this.x = tile.x;
		this.y = tile.y;

		if( !this.derivates.top || !this.derivates.bottom ) this.updateDerivates();

		this.derivates.top.x = tile.x;
		this.derivates.top.y = tile.y;
		this.derivates.bottom.x = tile.x;
		this.derivates.bottom.y = tile.y;

	

		let connect = {top:false,bottom:false,left:false,right:false};

		selection.forEach( (alt,i,a) => {
			if( alt !== tile ){
				connect.top 	= connect.top 		|| ( tile.cx === alt.cx && tile.cy === alt.cy+1),
				connect.bottom 	= connect.bottom 	|| ( tile.cx === alt.cx && tile.cy === alt.cy-1),
				connect.left 	= connect.left 		|| ( tile.cy === alt.cy && tile.cx === alt.cx+1),
				connect.right 	= connect.right 	|| ( tile.cy === alt.cy && tile.cx === alt.cx-1)
			}
		});

		if( Object.values(connect).includes(true) === false ){
			connect.left = true;
			connect.right = true;
		}

		var requiresUpdate = (	connect.top 	!== this.cc.top || 
								connect.right 	!== this.cc.right || 
								connect.bottom 	!== this.cc.bottom ||
								connect.left	!== this.cc.left );

		

		if( requiresUpdate ){
			
			// CACHE
			this.cc = connect;

			let w = this.texture.orig.width,
				h = this.texture.orig.height,
				hw = w * 0.5,
				hh = h*0.5;

			this.clear( this.mask );
			this.clear( this.derivates.top.mask );
			this.clear( this.derivates.bottom.mask );

			if( connect.left || connect.right ){			
				this.mask.beginFill(0xff0000, 0.5);
				if( connect.right ) this.mask.drawRect(0,-h,hw,h)
				if( connect.left ) this.mask.drawRect(-hw,-h,hw,h)
				this.mask.endFill();
			}

			if( connect.top ){
				this.derivates.top.mask.beginFill(0xff0000, 0.5);
				this.derivates.top.mask.drawRect(-hw,-h,hw,h)
				this.derivates.top.mask.endFill();
			}

			if( connect.bottom ){
				this.derivates.bottom.mask.beginFill(0xff0000, 0.5);
				this.derivates.bottom.mask.drawRect(0,-h,hw,h)
				this.derivates.bottom.mask.endFill();
			}
		}

	}

	clear(graphics){
		graphics.clear();
		graphics.beginFill(0x000000);
		graphics.drawRect(0,0,1,1)
	}
	


	static recursiveConnect(tile, array = []){

		let rootNode = (array.length === 0 )

		if( array.indexOf(tile) === -1 ){
			
			// PUSH START-TILE
			if( tile.content.contains('fence') ){
				array.push(tile);
			}
			
			// CHECK MY NEIGHBOURS
			tile.neighbours().forEach( (v,i,a) => {
				if( v.content.contains('fence') ){
					Fence.recursiveConnect(v, array );
				}
			});
		}

		if( rootNode ){

			// CREATE ALL CONNECTIONS
			array.forEach( (tile,index) => {
				tile.content.getSprites('fence').forEach( (fence) => {
					fence.updateConnections(tile, array)
				});
			});

		}
	
	}
}


import {HotModule} from 'HotModule.js'
HotModule(module, Fence );