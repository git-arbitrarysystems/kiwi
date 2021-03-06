import * as PIXI from 'pixi.js';
import {App} from 'App';
import {Generic} from 'grid/types/Generic'
import {Transform} from 'grid/Transform';
import {Texture} from 'grid/Texture';
import {Tile} from 'grid/Tile';

export class Kiwi extends Generic{
	
	constructor(texture){
		super(texture)

		if( !Kiwi.COUNT ) Kiwi.COUNT = 1;
		this.nr = Kiwi.COUNT;
		Kiwi.COUNT++;

		//this.on('enable', ()=>{});
		//this.on('disable', ()=>{});
		this.on('update', this.__onUpdate );
		this.on('update-position', this.__onUpdatePosition );
		this.on('confirm', this.__onConfirm );

	}

	__onUpdate(){
		// TRANSFORM SELF
		Transform.transform( this, this.textureData.size, this.textureData.skewX, this.textureData.skewY);
		this.anchor.set(0.5, 1 );
		if( this.textureData.images.shadow ){
			
			this.addDerivate('shadow');
			
			this.parent.addChildAt( this.derivates.shadow, this.parent.getChildIndex(this) );
			this.derivates.shadow.type = 'shadow';
			this.derivates.shadow.addedZIndex = -1000;
			this.derivates.shadow.texture = Texture(this.textureData, 'shadow' );

			// TRANSFORM SURFACE
			Transform.transform( this.derivates.shadow, this.textureData.size, this.textureData.skewX, this.textureData.skewY);
			this.derivates.shadow.anchor.set( 0.5, 1 );
		
		}else{
			this.destroyDerivate('shadow');
		}	
	}

	__onUpdatePosition(){
		//console.log('Kiwi.__onUpdatePosition', this, this.selection);
		this.x = this.limits.x;
		this.y = this.limits.bottom;
		if( this.derivates.shadow ){
			this.derivates.shadow.x = this.x;
			this.derivates.shadow.y = this.y;
		}
	}

	__onConfirm(){
		console.log('Kiwi.__onConfirm');
		this.move();

		var self = this;
		window.addEventListener('keydown', function(){ self.move('rand'); } );

	}






	toString(){
		return '[Kiwi '+this.nr+']' + (this.tile ? this.tile.toString() : '[No Tile]');
	}

	get selected(){ return this._selected }
	set selected(bool){
		this._selected = bool;
		this.tint = this._selected ? 0x00ffff : 0xffffff;
	}


	move(type){

		let dx = 0,
			dy = 0;
		if( type === 'rand' ){
			if( Math.random() < 0.5 ){
				dx = (Math.random() < 0.5 ? -1 : 1);
			}else{
				dy = (Math.random() < 0.5 ? -1 : 1);
			}
		}
		
		let tile = App.Grid.getTile({x:this.tile.cx + dx, y:this.tile.cy + dy});

		if( tile &&
			// WALKABLE TESTS
			((!tile.water && !tile.fence) || tile.road ) &&
			!(tile.kiwi && (dx !== 0 || dy !== 0) )
		){
			

			/*console.log('Kiwi.move', dx, dy, '>>>', this, tile.toString(), this.tile.toString() );
		 	debugger*/

			// UNHOVER
			this.tile.hover(false);

			// FACING DIRECTION
			var sx = Math.abs(this.scale.x) * ( (dx<0||dy<0) ? -1 : 1 );
			this.scale.set(sx, Math.abs(sx) );
			
			// GET NEW POSITION
			var position = Transform.c2p(tile.cx, tile.cy);
 

			var surfaceOffset = 0,
				offsetSurfaceScale = 1
			
			if( tile.road ){	
				tile.content.getSprites('road/').forEach( (road) => {
					if( road.surfaceOffset && road.surfaceOffset > surfaceOffset ){
						surfaceOffset = road.surfaceOffset;
						offsetSurfaceScale = road.scale.y;
					}
				})
			}

			this.x = position.x;
			this.y = position.y + Tile.halfHeight - surfaceOffset * offsetSurfaceScale;
			if( this.derivates.shadow ){
				this.derivates.shadow.x = this.x;
				this.derivates.shadow.y = this.y;
			}


		
	
			
			
			if( tile !== this.tile ){
				this._selection = [this.tile.content.move(this, tile )];
			} 

			// UPDATE Z-INDEXING
			//console.log('Kiwi.move', this.type, surfaceOffset);
			App.Grid.face.add(this, this.type, surfaceOffset);

			this.tile.hover(0x006699, 0.05)

			

			

		}

	}



	
}



import {HotModule} from 'HotModule.js'
HotModule(module, Kiwi );