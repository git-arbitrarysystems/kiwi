import * as PIXI from 'pixi.js';
import {App} from 'App';
import {Tile} from 'grid/Tile';
import {Generic} from 'grid/types/Generic'
import {Transform} from 'grid/Transform';

export class Fence extends Generic{
	
	constructor(sprite){
		super(sprite);

		this.on('update-transform', (e) => {

			[this.sprite, this.tc, this.bc].forEach((sprite)=>{
				sprite.texture = this.sprite.texture;
				Transform.transform( sprite, this.textureData.size, this.textureData.skewX, this.textureData.skewY);
				sprite.anchor.set(0.5, 1 );

			})

			this.tc.skew.set( this.sprite.skew.x, -this.sprite.skew.y)
			this.bc.skew.set( this.sprite.skew.x, -this.sprite.skew.y)

			if( this.tile && this.selection ) this.updateConnections();

		});

		this.on('update-position', (e) => {
			

			this.tc.x = this.sprite.x;
			this.tc.y = this.sprite.y;
			this.bc.x = this.sprite.x;
			this.bc.y = this.sprite.y;

			if( this.tile && this.selection ) this.updateConnections();

		});

	}

	enable(){

		console.log('Fence.enable');
		this.cc = {top:false,right:false,bottom:false,left:false};

		if( !this.sprite.mask )	this.sprite.mask = new PIXI.Graphics();
		if( !this.sprite.mask.parent ) this.sprite.addChild( this.sprite.mask );

		if( !this.bc ) this.bc = new PIXI.Sprite(this.sprite.texture);
		if( !this.bc.parent ) this.sprite.parent.addChild( this.bc);
		if( !this.bc.mask ) this.bc.mask = new PIXI.Graphics();
		if( !this.bc.mask.parent ) this.bc.addChild( this.bc.mask );

		this.sprite.parent.addChild( this.sprite );

		if( !this.tc ) this.tc = new PIXI.Sprite(this.sprite.texture);
		if( !this.tc.parent ) this.sprite.parent.addChild( this.tc );
		if( !this.tc.mask ) this.tc.mask = new PIXI.Graphics();
		if( !this.tc.mask.parent ) this.tc.addChild( this.tc.mask );
	}

	disable(){
		console.log('Fence.disable');
	}

	destroy(){

		console.log('Fence.destroy');
		if( this.sprite.mask ){
			this.sprite.mask.destroy();
			this.sprite.mask = null;
		}
		if( this.tc ){
			if( !this.tc._destroyed ) this.tc.destroy({children:true})
			this.tc = null;
		}
		
		if( this.bc ){
			if( !this.bc._destroyed ) this.bc.destroy({children:true})
			this.bc = null;
		}
	}




	updateConnections(tile = this.tile, selection = this.selection){

		/*if( !this.sprite.texture.valid ){
			this.sprite.texture.on('update', ()=>{ this.updateConnections() });
			return;
		}*/

		this.tc.visible = this.cc.top;
		this.bc.visible = this.cc.bottom;

		let connect = {top:false,bottom:false,left:false,right:false};

		selection.forEach( (alt,i,a) => {
			if( alt !== tile ){
				connect.top 	= connect.top 		|| ( tile.cx === alt.cx && tile.cy === alt.cy+1),
				connect.bottom 	= connect.bottom 	|| ( tile.cx === alt.cx && tile.cy === alt.cy-1),
				connect.left 	= connect.left 		|| ( tile.cy === alt.cy && tile.cx === alt.cx+1),
				connect.right 	= connect.right 	|| ( tile.cy === alt.cy && tile.cx === alt.cx-1)
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
			
			if( this.sprite.mask && (connect.left || connect.right) ){
				this.sprite.visible = true;
				this.sprite.mask.clear();
				this.sprite.mask.beginFill(0xff0000, 0.5);
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


				this.tc.visible = true;
				this.tc.mask.clear();
				this.tc.mask.beginFill(0xff00ff, 0.5);
				this.tc.mask.drawRect(
					-this.tc.texture.width*0.5,
					-this.tc.texture.height,
					this.tc.texture.width * 0.5,
					this.tc.texture.height
				);
			}else{
				this.tc.visible = false;
			}


			if( connect.bottom ){


				this.bc.visible = true;
				this.bc.mask.clear();
				this.bc.mask.beginFill(0x00ff00, 0.5);
				this.bc.mask.drawRect(
					-this.bc.texture.width*0.0,
					-this.bc.texture.height,
					this.bc.texture.width * 0.5,
					this.bc.texture.height
				);
			}else{
				this.bc.visible = false;
			}
		}


		this.addDerivate('tc', {sprite:this.tc, type:'fence', addedZIndex:-0.1})
		this.addDerivate('bc', {sprite:this.bc, type:'fence', addedZIndex: 0.1})
		
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
					fenceSprite.fence.updateConnections(tile, array)
				});
			});

		}
	
	}
}


import {HotModule} from 'HotModule.js'
HotModule(module, Fence );