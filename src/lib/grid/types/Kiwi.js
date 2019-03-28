import * as PIXI from 'pixi.js';
import {App} from 'App';
import {Generic} from 'grid/types/Generic'
import {Transform} from 'grid/Transform';
import {Texture} from 'grid/Texture';
import {Tile} from 'grid/Tile';

export class Kiwi extends Generic{
	
	constructor(sprite){

		

		super(sprite)

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
		Transform.transform( this.sprite, this.textureData.size, this.textureData.skewX, this.textureData.skewY);
		this.sprite.anchor.set(0.5, 1 );
		if( this.textureData.images.surface ){
			
			this.addDerivate('surface');
			
			this.sprite.parent.addChildAt( this.derivates.surface, this.sprite.parent.getChildIndex(this.sprite) );
			this.derivates.surface.type = 'surface';
			this.derivates.surface.addedZIndex = 1000000;
			this.derivates.surface.texture = Texture(this.textureData, 'surface' );

			// TRANSFORM SURFACE
			Transform.transform( this.derivates.surface, this.textureData.size, this.textureData.skewX, this.textureData.skewY);
			this.derivates.surface.anchor.set( 0.5, 1 );
		
		}else{
			this.destroyDerivate('surface');
		}	
	}

	__onUpdatePosition(){
		//console.log('Kiwi.__onUpdatePosition', this, this.selection);
		this.sprite.x = this.limits.x;
		this.sprite.y = this.limits.bottom;
		if( this.derivates.surface ){
			this.derivates.surface.x = this.sprite.x;
			this.derivates.surface.y = this.sprite.y;
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
		this.sprite.tint = this._selected ? 0x00ffff : 0xffffff;
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
			!(tile.kiwi && (dx !== 0 ||dy !== 0) )
		){
			

			console.log('Kiwi.move', dx, dy, '>>>' , tile.toString());

			// FACING DIRECTION
			var sx = Math.abs(this.sprite.scale.x) * ( (dx<0||dy<0) ? -1 : 1 );
			this.sprite.scale.set(sx, Math.abs(sx) );

			// GET NEW POSITION
			var position = Transform.c2p(tile.cx, tile.cy);
 

			var surfaceOffset = 0,
				offsetSurfaceScale = 1
			
			if( tile.road ){	
				tile.content.getSprites('road/').forEach( (sprite) => {
					if( sprite.surfaceOffset && sprite.surfaceOffset > surfaceOffset ){
						surfaceOffset = sprite.surfaceOffset;
						offsetSurfaceScale = sprite.scale.y;
					}
				})
			}
	
			
			this.tile.hover(false);
			if( tile !== this.tile ) this._selection = [this.tile.content.move(this.sprite, tile )];
			tile.hover(0x006699, 0.4)

			this.sprite.x = position.x;
			this.sprite.y = position.y + Tile.halfHeight - surfaceOffset * offsetSurfaceScale;
			if( this.derivates.surface ){
				this.derivates.surface.x = this.sprite.x;
				this.derivates.surface.y = this.sprite.y;
			}

			// UPDATE Z-INDEXING
			App.Grid.face.add(this.sprite, this.sprite.type, surfaceOffset);

		}

	}



	
}



import {HotModule} from 'HotModule.js'
HotModule(module, Kiwi );