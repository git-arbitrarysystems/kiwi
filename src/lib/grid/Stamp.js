import * as PIXI from 'pixi.js';

import {App} from 'App';
import {TextureData} from 'interface/Interface';

import {Transform} from 'grid/Transform';
import {Tile} from 'grid/Tile';
import {Texture} from 'grid/Texture';


import * as Type from 'grid/types/Type';





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
				var sprite = this.addChild( new PIXI.Sprite() );
				Type.Generic.mixin(this.mode, sprite, this.textureData.id );

				/*if (this.mode === 'road') {
					Road.mixin(sprite);
				}else if (this.mode === 'fence') {
					Fence.mixin(sprite);
				}else if( this.mode === 'surface' ){
					Surface.mixin(sprite);
				}else if( this.mode === 'build' ){
					Build.mixin(sprite);
				}*/
				this.sprites.push( sprite );
				//this.updateSpriteTransform([sprite]);
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
				//this.texture = PIXI.Texture.from(this.textureData.images.main.url);
				//this.updateSpriteTransform();
			}else{
				this.mode = undefined;
			}
		}
	}

	// UPDATE TEXTURE OF ALL SPRITES
	/*get texture(){ return this._texture }
	set texture(texture){

		if( texture !== this.texture ){

			this._texture = Texture(this.textureData);

			if( !this.texture.valid ){
				// TEXTURE IS NOT LOADED YET
				this.texture.on('update', (e)=>{ this.updateSpriteTransform(); })
			}else{
				this.updateSpriteTransform()
			}
		}
	};*/

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
				Type.Generic.mixin(this.mode, sprite, this.textureData.id);
			});
		}
	}
	get mode(){ return this._mode };

	

	// UPDATE THE TRANSFORMATION OF EACH SPRITE
	updateSpriteTransform(sprites = this.sprites){
		//console.log('Stamp.updateSpriteTransform');


		sprites.forEach( (sprite) => {


				

			/*Transform.transform( sprite, this.textureData.size, this.textureData.skewX, this.textureData.skewY);
			sprite.anchor.set(0.5,  ( this.textureData.type === 'build' || this.textureData.type === 'fence') ? 1 : 0.5 );
			sprite.texture = this.texture;
			sprite.cutoff = this.textureData.cutoff;*/

			/*[sprite.topConnector, sprite.bottomConnector].forEach((connector) => {
				if( connector ){
					connector.texture = sprite.texture;
					connector.anchor.set( sprite.anchor.x, sprite.anchor.y );
					connector.scale.set( sprite.scale.x, sprite.scale.y );
					connector.skew.set( sprite.skew.x, -sprite.skew.y)
				}
			})
*/

			if( this.textureData.images.surface ){
				
				/*if( !this.surfaceSprite ){
					this.surfaceSprite = this.addChildAt( new PIXI.Sprite(), 0 );
				}

				this.surfaceSprite.texture = Texture(this.textureData, 'surface');
				
				Transform.transform( this.surfaceSprite, this.textureData.size, false, false );
				this.surfaceSprite.anchor.set(0.5, 1 );*/

			}else if( this.surfaceSprite ){

				/*this.surfaceSprite.destroy();
				this.surfaceSprite = undefined;*/
			}

		});
	}

	// UPDATE THE POSITION OF EACH SPRITE // USUALY ON SELECTION CHANGED
	updateSpritesPosition(){
		
		// SET VISIBILE WHEN CONTENT
		this.visible = !( !this.selection || this.selection.length === 0 || !this.textureData);
		if( !this.visible ) return;

		let multisprite = (this.mode === 'fence' || this.mode === 'road');

		// SINGLE / MULTISPRITE MODE
		if( multisprite ){
			this.length = this.selection.length;
		}else{
			this.length = 1;
		}


		this.sprites.forEach( (sprite, i, a) => {
			sprite[this.mode].textureDataId = this.textureData.id;
			sprite[this.mode].tile = this.selection[i];
			if( !multisprite ){
				sprite[this.mode].limits = this.selection.limits;
			}
		});



		return;




		// SET POSITIONS
		if( this.mode === 'fence'){
			this.length = this.selection.length;
			this.sprites.forEach( (sprite,i,a) => {
				sprite.x = this.selection[i].x;
				sprite.y = this.selection[i].y;
				/*[sprite.topConnector, sprite.bottomConnector].forEach((connector) => {
					if( connector ){
						connector.x = sprite.x;
						connector.y = sprite.y;
					}
				})*/
				sprite[this.mode].updateConnections(i, this.selection);
			});
		}else if( this.mode === 'road'){
			this.length = this.selection.length;
			this.sprites.forEach( (sprite,i,a) => {
				sprite.x = this.selection[i].x;
				sprite.y = this.selection[i].y;
				sprite[this.mode].updateConnections(i, this.selection);
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

			/*if( this.surfaceSprite ){
				this.sprites[0].surfaceSprite = this.surfaceSprite;
				this.surfaceSprite.x = this.selection.limits.x;
				this.surfaceSprite.y = this.selection.limits.y;
			}*/

		}


	}
}

import {HotModule} from 'HotModule'
HotModule(module, Stamp);