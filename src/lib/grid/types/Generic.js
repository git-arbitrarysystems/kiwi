import * as PIXI from 'pixi.js';
import {TextureData} from 'interface/Interface';
import {Texture} from 'grid/Texture';
import {Stamp} from 'grid/Stamp';

export class Generic extends PIXI.utils.EventEmitter{
	constructor(sprite){
		super();

		this.sprite = sprite;
		this.sprite.derivates = {};
		this.enabled = true;
	}

	get enabled(){ return this._enabled }
	set enabled(bool){
		if( bool !== this.enabled ){
			this._enabled = bool;
			if( !bool ){
				this.disable();
				if( this.sprite.parent instanceof Stamp ){
					this.destroyDerivates();
					this.destroy();
				}
			}else{
				this.enable();
			}
		}
	}


	/* OVERWRITABLE */
	enable(){
		console.warn('Generic.enable should be overwritten in class ' + this.constructor.name );
	}
	disable(){
		console.warn('Generic.disable should be overwritten in class ' + this.constructor.name );
	}
	destroy(){
		console.warn('Generic.destroy should be overwritten in class ' + this.constructor.name );
	}
	

	addDerivate(id, content){
		if( !content.sprite ) {
			throw new Error('derivate must contain a sprite');
		}
		this.sprite.derivates[id] = content;
	}

	destroyDerivates(){
		for( var s in this.sprite.derivates ){
			this.sprite.derivates[s].sprite.destroy({children:true});
			delete this.sprite.derivates[s]
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

			if( !texture.valid ){
				texture.on('update', ()=>{
					this.emit('update-transform');
				})
			}else{
				this.emit('update-transform');
			}


			
		}
	}

	get selection(){ return this._selection }
	set selection(selection){
		var _selectionHasChanged = !this._selection || 
									this._selection.length !== selection.length || 
									selection.some( (v,i,a) => { if( this._selection[i] !== selection[i] ){ return true; } }, this);
		//if( _selectionHasChanged ){
			this._selection = selection;
			this.emit('update-position')
		//}
	}


	get tile(){ return this._tile}
	set tile(tile){
		//if( tile !== this.tile ){
			this._tile = tile;
			this.sprite.x = tile.x;
			this.sprite.y = tile.y;
			this.emit('update-position')
		//}
	}

	get limits(){ return this._limits ? this._limits : {}}
	set limits(limits){
		//if( limits.x !== this.limits.x || limits.y !== this.limits.y ){
			this._limits = limits;
			this.sprite.x = limits.x;
			this.sprite.y = limits.y;
			this.emit('update-position')
		//}
	}



}

