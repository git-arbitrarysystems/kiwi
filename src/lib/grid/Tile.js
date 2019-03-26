import * as PIXI from 'pixi.js';
import {TextureData} from 'interface/Interface';
import {App} from 'App';


class Tile extends PIXI.Sprite{
	constructor(cx,cy){
		super(PIXI.Texture.WHITE);
		this._neighboursRequireUpdate = true;
		this.content = new TileContent(this);
		this.cx = cx;
		this.cy = cy;
	}

	

	neighbours(includeDiagonal = false, d = 1){
		if( this._neighboursRequireUpdate ){
			
			this._neighbours = [
				App.Grid.getTile({x:this.cx+d, y:this.cy}),
				App.Grid.getTile({x:this.cx-d, y:this.cy}),
				App.Grid.getTile({x:this.cx, y:this.cy+d}),
				App.Grid.getTile({x:this.cx, y:this.cy-d})
			].filter( (tile) => { return tile ? true : false} );

			this._diagonalNeighbours = [
				App.Grid.getTile({x:this.cx+d, y:this.cy-d}),
				App.Grid.getTile({x:this.cx+d, y:this.cy+d}),
				App.Grid.getTile({x:this.cx-d, y:this.cy-d}),
				App.Grid.getTile({x:this.cx-d, y:this.cy+d})
			].filter( (tile) => { return tile ? true : false} );

			this._neighboursRequireUpdate = false;
		}

	

		if( includeDiagonal ){
			return this._diagonalNeighbours.slice(0).concat( this._neighbours );
		}else{
			return this._neighbours;
		}

	}


	


	hover(color, alpha = 0.15){
		this._hoverColor = color;
		this._hoverAlpha = alpha;
		this.updateTint()
	}

	get destroy(){ return this._selected }
	set destroy(boolean){
		this._destroy = boolean;
		this.updateTint()
	}

	updateVariables(updateNeighbours = false){
		this.water = this.content.contains('surface/water') || this.content.contains('build/lake');
		this.build = this.content.contains('build/');
		this.fence = this.content.contains('fence/');
		this.surface = this.content.contains('surface/')
		this.road = this.content.contains('road/')
		
		this.beach =  ( !this.water && !this.content.contains('surface/sand') && this.neighbours().some( (tile) => { return tile.water; }) ) ||
					  (  this.water && this.neighbours().some( (tile) => { return tile.content.contains('surface/sand'); }) );

		this.updateTint(); 	


		if( updateNeighbours ){
			this.neighbours(true).forEach( (tile) => {
				tile.updateVariables();
			})
		}


		

	}


	updateTint(){
		this.alpha = 0.15;
		this.tint = 0xffffff;

		if( this.water 	){ this.tint = 0x0000ff;}
		if( this.fence 	){ this.tint = 0x555555;}
		if( this.beach 	){ this.tint = 0xffaa00;}
		
		if( this.build 	){ this.tint = 0xff00ff;}
 		if( this._hoverColor ){ this.tint = this._hoverColor; this.alpha = this._hoverAlpha; }
		
	}

	toString(){
		return '[Tile '+this.cx+' '+this.cy+']';
	}
}

Tile.width = 64;
Tile.ratio = 0.666667;
Tile.height = Tile.width * Tile.ratio;
Tile.diameter = Math.sqrt( Tile.height*Tile.height+Tile.width*Tile.width);
Tile.halfWidth = Tile.width * 0.5;
Tile.halfHeight = Tile.height * 0.5;
Tile.skewX = Math.atan2( Tile.width, Tile.height);
Tile.skewY = Math.atan2( -Tile.height, Tile.width);


class TileContent{
	constructor( tile){
		this.keys = [];
		this.nodes = [];
		this.tile = tile;
	}
	

	

	testSurface(expr){
		if( expr === 'water' ) return this.tile.water;
		if( expr === '!water' ) return !this.tile.water;
		if( expr === 'beach' ) return this.tile.beach;
		if( expr === '!beach' ) return !this.tile.beach;
		if( expr === 'water|beach' ) return this.tile.water || this.tile.beach;
		if( expr === '!water|beach' ) return !(this.tile.water || this.tile.beach);
	}

	add(id, node){
		if( this.keys.indexOf(id) === -1 ){
			//console.log( this.tile.toString() + '.content.add', node.id);
			
			// REGISTER THE NEW CONTENT
			this.keys.push(id);
			this.nodes.push(node);

			// APPEND TO FACE
			node.sprites.forEach( (sprite) => {
				App.Grid.face.add(sprite, TextureData[node.id].type );
			});

		}


		this.tile.updateVariables(true);

	}

	


	// REMOVE CONTENT FROM TILE
	remove(wildcard){
		let regex = new RegExp(wildcard, 'i');

		console.log( 'TileContent.remove', wildcard, this.keys) //, node );



		for(var index = this.keys.length-1; index >= 0 ; index--){
			// CHECK CONTENT ID WILDCARD IS IN THE KEYS 
			if( regex.test(this.keys[index]) ){
				// REMOVE KEY FROM TILE
				let key = this.keys.splice(index,1)[0];
				//console.log( 'TileContent.remove', key) //, node );

				// REMOVE NODE FROM TILE
				let node = this.nodes.splice(index,1)[0];

				let tileIndex = node.tiles.indexOf(this.tile),
					spriteIndex = tileIndex % node.sprites.length;

				if( !isNaN(spriteIndex) ){
					// REMOVE SPRITE FROM NODE
					App.Grid.face.remove( node.sprites.splice(spriteIndex,1)[0] , TextureData[node.id].type );
				}

				// REMOVE TILE FROM NODE
				node.tiles.splice(tileIndex,1);
			}
		}


		this.tile.updateVariables(true);

	}


	contains(wildcard){
		let regex = new RegExp(wildcard,'i');
		return this.keys.some( (v,i,a) => { return regex.test(v)});
	}


	select(wildcard){
		let regex = new RegExp(wildcard, 'i'),
			tiles = [];

		this.keys.forEach( (v,index,a) => {
			// CHECK CONTENT ID WILDCARD IS IN THE KEYS 
			if( regex.test(v) ){
				tiles = tiles.concat( this.nodes[index].tiles )
			}
		});
		
		return tiles;
	}


	getDataNodes(wildcard){
		let regex = new RegExp(wildcard, 'i'),
			data = [];

		this.keys.forEach( (v,index,a) => {
			// CHECK CONTENT ID WILDCARD IS IN THE KEYS 
			if( regex.test(v) ){
				data = data.concat( this.nodes[index] )
			}
		});
		
		return data;
	}


	getSprites(wildcard){
		let regex = new RegExp(wildcard, 'i'),
			sprites = [];
		
		this.keys.forEach( (v,index,a) => {

			// CHECK CONTENT ID WILDCARD IS IN THE KEYS 
			if( regex.test(v) ){
				
				let node = this.nodes[index],
					tileIndex = node.tiles.indexOf(this.tile),
					spriteIndex = tileIndex % node.sprites.length;

				if( !isNaN(spriteIndex) ){
					// REMOVE SPRITE FROM NODE
					sprites.push( node.sprites[spriteIndex] );
				}
			}
		
		});

		return sprites;

	}


	toString(){
		return '[' + this.keys.join(',') + ']'
	}
}



export {Tile, TileContent};


import {HotModule} from 'HotModule.js'
HotModule(module, Tile, TileContent);
