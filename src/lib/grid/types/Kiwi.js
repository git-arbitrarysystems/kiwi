import * as PIXI from 'pixi.js';
import {TextureData, Images} from 'interface/Interface';
import {App} from 'App';
import {Tile} from 'grid/Tile';
import {Transform} from 'grid/Transform';


export class Kiwi extends PIXI.Sprite{
	constructor(tile){
		super();
		this.texture = PIXI.Texture.from(Images.kiwi);
		this.anchor.set(185/512, 435/512);
		this.scale.set( Tile.width * 1 / (512 * 1.5) );

		this.tint = Math.floor( Math.random() * 0xffffff );

		window.addEventListener('keydown', (e) => {
			var a = Math.random() < 0.5,
				b = Math.random() < 0.5,
				d = a ? -1 : 1;
			this.move(b?d:0,!b?d:0);
		});
		

		this.tile = tile;


	}

	get tile(){ return this._tile };
	set tile(tile){
		this._tile = tile;
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
		

		this.x = position.x;
		this.y = position.y - surfaceOffset * offsetSurfaceScale;
		App.Grid.face.add(this, 'kiwi', surfaceOffset);  

	}

	move(dx,dy){
		var tile = App.Grid.getTile({x:this.tile.cx + dx, y:this.tile.cy + dy});

		var walkable = false;
		if( tile ){
			walkable = (!tile.water && !tile.fence) || tile.road;
		}


		if( walkable ){
			this.tile = tile;
			var sx = Math.abs(this.scale.x) *( (dx<0||dy<0) ? -1 : 1 );
			this.scale.set(sx, Math.abs(sx) );
		}
	}
}






import {HotModule} from 'HotModule.js'
HotModule(module, Kiwi );