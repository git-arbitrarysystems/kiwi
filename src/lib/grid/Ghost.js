import * as PIXI from 'pixi.js';
import {GhostTile, TextureData} from 'interface/Interface';
import {App} from 'App';
import {Transform} from 'grid/Transform';
import {Stamp} from 'grid/Stamp';


export class Ghost extends PIXI.Sprite{
	constructor(texture){
		super(texture);
		this.enabled = false;
	}

	get textureDataId(){ return this._textureDataId }
	set textureDataId(id){
		if( id && TextureData[id] && TextureData[id].type === 'surface' && this.textureDataId !== id ){
			console.log('Ghost.textureDataId', id );
			this._textureDataId = id;
			this.texture = PIXI.Texture.from( TextureData[id].images.main.url );
			Transform.transform(this, GhostTile.size );
		}
	}

	get enabled(){ return this._enabled };
	set enabled(bool){
		if( this._enabled !== bool ){
			this._enabled = bool;
			this.visible  = bool;
		}
	}

	coordinates(obj){
		obj.x = Math.round(obj.x/GhostTile.size[0]) * GhostTile.size[0];
		obj.y = Math.round(obj.y/GhostTile.size[1]) * GhostTile.size[1];

		if( obj.x !== this.cx || obj.y !== this.cy ){

			//console.log('Ghost.coordinates', obj);
		
			this.cx = obj.x;
			this.cy = obj.y;
			Transform.position(this);
		}
	}


	confirm(){

		console.log('Ghost.confirm', this.textureDataId );

		let left = this.cx-Math.floor( GhostTile.size[0]*0.5 ),
			top = this.cy-Math.floor( GhostTile.size[1]*0.5 ),
			selection = [];

		var x,y;
		for( x=left ; x<left+GhostTile.size[0]; x++ ){
			for( y=top ; y < top+GhostTile.size[0]; y++ ){
				selection.push( App.Grid.getTile({x:x, y:y}, true, true) );
			}
		}

		let stamp = new Stamp(TextureData[this.textureDataId], selection);
		App.Grid.data.add( this.textureDataId, stamp.selection );

		this.enabled = false;

	}


}



import {HotModule} from 'HotModule'
HotModule(module, Ghost);

