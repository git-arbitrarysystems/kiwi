import * as PIXI from 'pixi.js';
import {Transform} from 'grid/Transform';
import {Tile} from 'grid/Tile';
import {Road} from 'grid/Road';
import {Surface} from 'grid/Surface';
import {App} from 'App';
import {TextureData} from 'interface/Interface';






export class Stamp extends PIXI.Container{
	constructor(interfaceSelection = false, selectedTiles = []){
		super();
		this.sprites = [];
		this.textureData = interfaceSelection;
		this.selection = selectedTiles;
		if( interfaceSelection ){
			this.updateSpritesPosition();
		}
	}

	// GET/SET THE AMOUNT OF SPRITES FOR THE STAMP
	get length(){ return this.sprites.length;}
	set length(int){
		int = Math.max(1,int);
		if( int !== this.length ){

			
			// ADD SPRITES
			while( this.sprites.length < int ){
				var sprite = this.addChild( new PIXI.Sprite(this.texture) );
				if( this.mode === 'road' ){
					Road.mixin(sprite);
				}else if( this.mode === 'surface' ){
					Surface.mixin(sprite);
				}
				this.sprites.push( sprite );
				this.updateSpriteTransform([sprite]);
			}

			

			// REMOVE SPRITES
			while( this.sprites.length > int ){	this.sprites.splice(0,1)[0].destroy(); }
			
		}
	}

	// GET/SET THE TEXTUREDATA ELEMENT
	get textureData(){ return this._textureData; }
	set textureData(textureData){
		if( textureData !== this.textureData ){
			this._textureData = textureData;
			if( this.textureData ){
				this.mode = this.textureData.type;
				this.texture = PIXI.Texture.from(this.textureData.url);
				this.updateSpriteTransform();
			}else{
				this.mode = undefined;
			}
		}
	}

	// UPDATE TEXTURE OF ALL SPRITES
	get texture(){ return this._texture }
	set texture(texture){

		if( texture !== this.texture ){

			//console.log('Stamp.texture', 'update');
			this._texture = texture;
			
			// ORIGINAL SIZE
			this.texture.orig = new PIXI.Rectangle( 0, 0, this.textureData.orig.width, this.textureData.orig.height );

			// TRIMMED AREA
			this.texture.trim = new PIXI.Rectangle( this.textureData.trim.left, this.textureData.trim.top, this.textureData.trim.width, this.textureData.trim.height );
			
			// UPDATE TEXTURE
			this.texture.updateUvs();

			if( this.texture.width === 1 ){
				// TEXTURE IS NOT LOADED YET
				this.texture.on('update', (e)=>{ this.updateSpriteTransform(); })
			}else{
				this.updateSpriteTransform()
			}
		}
	};

	// GET / SET SELECTED TILES
	get selection(){ return this._selection; }
	set selection( selectedTiles ){
		var _selectionHasChanged = !this.selection || 
									this.selection.length !== selectedTiles.length || 
									selectedTiles.some( (v,i,a) => { if( this._selection[i] !== selectedTiles[i] ){ return true; } }, this);
		
		if( _selectionHasChanged ){
			this._selection = selectedTiles;

			// GET SELECTION LIMITS
			let max = 1000000;
			this.selection.limits = {left:max,right:-max,top:max,bottom:-max};
			this.selection.forEach( (tile,i,a) => {
				this.selection.limits.top 		= Math.min(tile.y - Tile.halfHeight, this.selection.limits.top);
				this.selection.limits.bottom 	= Math.max(tile.y + Tile.halfHeight, this.selection.limits.bottom);
				this.selection.limits.left 		= Math.min(tile.x - Tile.halfWidth,  this.selection.limits.left);
				this.selection.limits.right		= Math.max(tile.x + Tile.halfWidth,  this.selection.limits.right);
			});
			this.selection.limits.height = this.selection.limits.bottom - this.selection.limits.top;
			this.selection.limits.width = this.selection.limits.right - this.selection.limits.left;

			this.selection.limits.x = ( this.selection.limits.left + this.selection.limits.right ) * 0.5
			this.selection.limits.y =   this.selection.limits.top  + this.selection.limits.height  * (this.textureData && this.textureData.type === 'build' ? 1 : 0.5);

			this.updateSpritesPosition();
		}	
	}


	// STAMP MODES
	set mode(str){
		if( this._mode !== str ){
			this._mode = str;
			this.sprites.forEach( (sprite) => {
				if( sprite.road ) sprite.road.enabled = (this.mode === 'road' );
				if( sprite.surface ) sprite.surface.enabled = (this.mode === 'surface' );

				if( this.mode === 'road' && !sprite.road ) Road.mixin(sprite);
				if( this.mode === 'surface' && !sprite.surface ) Surface.mixin(sprite)

			})
		}
	}
	get mode(){ return this._mode };

	

	// UPDATE THE TRANSFORMATION OF EACH SPRITE
	updateSpriteTransform(sprites = this.sprites){
		//console.log('Stamp.updateSpriteTransform');
		sprites.forEach( (sprite) => {
			Transform.transform( sprite, this.textureData.size[0], this.textureData.skew);
			sprite.anchor.set(0.5, this.textureData.type === 'build' ? 1 : 0.5 )//}//{x:0.5, y:isBuild ? 1 : 0.5}
			sprite.texture = this.texture;
		});
	}

	// UPDATE THE POSITION OF EACH SPRITE // USUALY ON SELECTION CHANGED
	updateSpritesPosition(){
		
		// SET VISIBILE WHEN CONTENT
		this.visible = !( !this.selection || this.selection.length === 0 || !this.textureData);
		if( !this.visible ) return;

		// SET POSITIONS
		if( this.mode === 'road'){
			this.length = this.selection.length;
			this.sprites.forEach( (sprite,i,a) => {
				sprite.x = this.selection[i].x;
				sprite.y = this.selection[i].y;
				sprite.road.updateConnections(i, this.selection);
			});
		}else if( this.mode === 'surface' ){
			this.length = 1;
			this.sprites[0].x = this.selection.limits.x;
			this.sprites[0].y = this.selection.limits.y;
			this.sprites[0].surface.updateConnections( this.selection[0], this.textureData.id );
		}else{
			this.length = 1;
			this.sprites[0].x = this.selection.limits.x;
			this.sprites[0].y = this.selection.limits.y;
		}


	}
}

import {HotModule} from 'HotModule'
HotModule(module, Stamp);