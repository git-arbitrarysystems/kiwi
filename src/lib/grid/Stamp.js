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
	}

	
	// GET/SET THE TEXTUREDATA ELEMENT
	get textureData(){ return this._textureData; }
	set textureData(textureData){

		if( textureData !== this.textureData ){
			this._textureData = textureData;
			if( this.textureData ){
				this.mode = this.textureData.type;
				this.visible = true;
			}else{
				this.mode = undefined;
				this.visible = false;
			}

			//console.log('Stamp.mode:', this.mode, this.sprites.length);

			this.multiSpriteMode = ( ['fence', 'road'].indexOf(this.mode) !== -1 );
			this.sprites.forEach( (sprite, index, array) => {
				if( sprite.type !== this.mode ){
					Type.Generic.destroy(sprite);
					array[index] = this.addChild( Type.Generic.create(this.mode, this.textureData.id, this.selection, index) );
					array[index].visible = this.visible;
				}
			});
			
			

		}
	}


	
	


	// GET / SET SELECTED TILES
	get selection(){ return this._selection || []; }
	set selection( selection ){
		var _selectionHasChanged = !this.selection || 
									this.selection.length !== selection.length || 
									selection.some( (v,i,a) => { if( this._selection[i] !== selection[i] ){ return true; } }, this);
		
		if( _selectionHasChanged ){
			
			this._selection = selection;

			if( this.mode ){

				if(this.multiSpriteMode ){
					this.length = this.selection.length;
				}

				this.sprites.forEach( (sprite, index) => {
					sprite.index = index;
					sprite.selection = this.selection;
				});
			}

			this.visible = ( this._selection && this._selection.length > 0)
			
			
		}
	}



	// GET/SET THE AMOUNT OF SPRITES FOR THE STAMP
	get length(){ return this.sprites.length;}
	set length(int){
		int = Math.max(1,int);
		if( int !== this.length){

			// ADD SPRITES
			while( this.sprites.length < int ){
				var sprite = this.addChild( Type.Generic.create(this.mode, this.textureData.id, this.selection, this.sprites.length ) );
				this.sprites.push( sprite );
			}

			// REMOVE SPRITES
			while( this.sprites.length > int ){
				Type.Generic.destroy( this.sprites.splice(0,1)[0] )
			}
			
		}
	}

	get multiSpriteMode(){ return this._multiSpriteMode };
	set multiSpriteMode(bool){
		if( bool !== this._multiSpriteMode ){
			this._multiSpriteMode = bool;

			if( this.multiSpriteMode ){
				this.length = this.selection.length;
			}else{
				this.length = 1;
			}

		}
		
	}

}

import {HotModule} from 'HotModule'
HotModule(module, Stamp);