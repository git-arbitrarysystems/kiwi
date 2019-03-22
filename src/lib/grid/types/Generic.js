import * as PIXI from 'pixi.js';
import {TextureData} from 'interface/Interface';
import {Texture} from 'grid/Texture';
import {Stamp} from 'grid/Stamp';
import {Tile} from 'grid/Tile';

export class Generic extends PIXI.utils.EventEmitter{
	constructor(sprite){
		super();

		this.sprite = sprite;
		this.derivates = {};
		this.sprite.derivates = this.derivates;

	}

	get enabled(){ return this._enabled }
	set enabled(bool){
		if( bool !== this.enabled ){
			this._enabled = bool;
			if( !bool ){
				this.emit('disable');
				if( this.sprite.parent instanceof Stamp ){
					this.destroyAllDerivates();
				}
			}else{
				this.emit('enable');
			}
		}
	}


	
	

	addDerivate(id){
		if( !this.derivates[id] ){
			this.derivates[id] = new PIXI.Sprite();
		}
	}

	destroyDerivate(id){
		if( this.derivates[id] ){
			console.log('Generic.destroyDerivate', id);
			this.derivates[id].destroy({children:true});
			delete this.derivates[id];
		}
	}

	destroyAllDerivates(){
		for( var s in this.derivates ){
			this.destroyDerivate(s);
		}
	}


	get textureData(){
		if( TextureData[this.textureDataId] ) return TextureData[this.textureDataId];
		return undefined;
	}

	get textureDataId(){ return this._textureDataId }
	set textureDataId(id){
		if( id !== this.textureDataId ){
			this._textureDataId = id;

			var texture = Texture(this.textureData);
			this.sprite.texture = texture;
			this.sprite.cutoff = this.textureData.cutoff;
			this.emit('update');
		}
	}

	get selection(){ return this._selection }
	set selection(selection){
		this._selection = selection;
		this._dirtyLimits = true;
		this.emit('update-position')
	}

	get index(){ return this._index || 0 }
	set index(i){ this._index = i; }

	get tile(){
		if( this.selection && this.selection[this.index] ){
			return this.selection[this.index];
		}
		return false;
	}

	get limits(){

		if( !this._limits || this._dirtyLimits ){
			
			let max = 1000000;
			this._limits = {left:max,right:-max,top:max,bottom:-max};
			this.selection.forEach( (tile,i,a) => {
				this._limits.top 		= Math.min(tile.y - Tile.halfHeight, this._limits.top);
				this._limits.bottom 	= Math.max(tile.y + Tile.halfHeight, this._limits.bottom);
				this._limits.left 		= Math.min(tile.x - Tile.halfWidth,  this._limits.left);
				this._limits.right		= Math.max(tile.x + Tile.halfWidth,  this._limits.right);
			});
			this._limits.height = this._limits.bottom - this._limits.top;
			this._limits.width = this._limits.right - this._limits.left;

			this._limits.x = this._limits.left + this._limits.width * 0.5
			this._limits.y = this._limits.top  + this._limits.height * 0.5;
		}

		return this._limits;

	}



	


}

