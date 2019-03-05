import * as PIXI from 'pixi.js';
import {Transform} from 'grid/Transform';
import {Tile} from 'grid/Tile';
import {Road} from 'grid/Road';
import {App} from 'App';






export class Stamp extends PIXI.Container{
	constructor(){
		super();
		this.visible = false;
		this.reset();
	}

	reset(){
		this.sprites = [ this.addChild( new PIXI.Sprite() ) ];
		this.url = undefined;
		this.update();
		this.preview(this.selectedTiles);
	}
	
	// TEXTURE SHORTCUT
	set texture(texture){ this.sprites.forEach( (s) => { s.texture = texture }); }
	get texture(){ return this.sprites[0].texture; }

	// ANCHOR SHORTCUT
	set anchor( obj){ this.sprites.forEach( (s) => { s.anchor.set(obj.x, obj.y); }); }
	get anchor(){ return this.sprites[0].anchor; }

	update(){


		this.interfaceSelection = App.Interface.selected();

		this.visible = this.interfaceSelection ? true : false;
		if( !this.visible || this.url === this.interfaceSelection.url ) return;

		// CACHE URL
		this.url = this.interfaceSelection.url;

		// UPDATE TEXTURES
		this.texture = PIXI.Texture.from(this.interfaceSelection.url);
		this.texture.orig = new PIXI.Rectangle( 0,0,this.interfaceSelection.orig.width,this.interfaceSelection.orig.height);
		this.texture.trim = new PIXI.Rectangle( this.interfaceSelection.trim.left, this.interfaceSelection.trim.top, this.interfaceSelection.trim.width, this.interfaceSelection.trim.height );;
		this.texture.updateUvs();

		if( this.texture.width === 1 ){ // TEXTURE IS NOT LOADED YET
			this.texture.on('update', (e)=>{ this.gridTransform(); })
		}else{
			this.gridTransform()
		}

	}
	gridTransform(){
		this.sprites.forEach( (s) => {
			Transform.transform(s, this.interfaceSelection.size[0], this.interfaceSelection.skew);
		})
		
	}

	set length(int){
		int = Math.max(1,int);
		if( int !== this.length ){
			while( this.sprites.length < int ){	this.sprites.push( this.addChild( new PIXI.Sprite(this.texture) ) ); }
			while( this.sprites.length > int ){	this.removeChild( this.sprites.splice(0,1)[0] );}
			this.gridTransform();
		}
	}
	get length(){
		return this.sprites.length;
	}


	preview(selectedTiles = [] ){

		this.selectedTiles = selectedTiles;

		if( this.selectedTiles.length === 0 || !this.interfaceSelection ){
			this.visible = false;
			return;
		}else{
			this.visible = true;
		}

		let isRoad = this.interfaceSelection.type === 'road',
			isBuild = this.interfaceSelection.type === 'build';

		this.length = isRoad ? Math.max(selectedTiles.length, 1) : 1;
		this.anchor = {x:0.5, y:isBuild ? 1 : 0.5}

		// GET SELECTION LIMITS
			let max = 1000000,
				limits = {left:max,right:-max,top:max,bottom:-max};
		if( !isRoad ){

			this.selectedTiles.forEach( (tile,i,a) => {
				limits.top 		= Math.min(tile.y - Tile.halfHeight, limits.top);
				limits.bottom 	= Math.max(tile.y + Tile.halfHeight, limits.bottom);
				limits.left 	= Math.min(tile.x - Tile.halfWidth,  limits.left);
				limits.right	= Math.max(tile.x + Tile.halfWidth,  limits.right);
			});
			limits.height = limits.bottom - limits.top;
			limits.width = limits.right - limits.left;

			
		}

		this.sprites.forEach( (sprite,i,a) => {
			if( isRoad ){
				if( !sprite.road ) Road.fromSprite(sprite);

				var top = 		( this.selectedTiles[i-1] && this.selectedTiles[i-1].cy < this.selectedTiles[i].cy ) ||
								( this.selectedTiles[i+1] && this.selectedTiles[i+1].cy < this.selectedTiles[i].cy ),
					right = 	( this.selectedTiles[i-1] && this.selectedTiles[i-1].cx > this.selectedTiles[i].cx ) ||
								( this.selectedTiles[i+1] && this.selectedTiles[i+1].cx > this.selectedTiles[i].cx ),
					bottom = 	( this.selectedTiles[i-1] && this.selectedTiles[i-1].cy > this.selectedTiles[i].cy ) ||
								( this.selectedTiles[i+1] && this.selectedTiles[i+1].cy > this.selectedTiles[i].cy ),
					left = 		( this.selectedTiles[i-1] && this.selectedTiles[i-1].cx < this.selectedTiles[i].cx ) ||
								( this.selectedTiles[i+1] && this.selectedTiles[i+1].cx < this.selectedTiles[i].cx );

			

				sprite.road.connect(top,right,bottom,left);
				sprite.x = this.selectedTiles[i].x;
				sprite.y = this.selectedTiles[i].y;
			}else{
				if( sprite.road ) sprite.road.clear();
				sprite.x = ( limits.left + limits.right ) * 0.5
				sprite.y = limits.top  + limits.height  * this.anchor.y;
			}
			
		});
	}

	apply(){

		console.log('Stamp.apply: ###', this.selectedTiles.length, this.interfaceSelection.type, this.sprites.length);
		if( this.selectedTiles.length === 1 && this.interfaceSelection.type === 'road' ) return;

		this.sprites.forEach( (v,i,a) => {
			App.Grid.face.addChild(v);
			v.alpha = 0.5;
		});
		this.reset();
	}
}

import {HotModule} from 'HotModule'
HotModule(module, Stamp);