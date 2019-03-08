import * as PIXI from 'pixi.js';
import {TextureData} from 'interface/Interface';
import {App} from 'App';

class Tile extends PIXI.Sprite{
	constructor(cx,cy){
		super(PIXI.Texture.WHITE);

		this.content = new TileContent(this);

		this.alpha = 0.2;
		this.cx = cx;
		this.cy = cy;
	}
	set hover(boolean){
		this._hover = boolean;
		if( !this._selected ) this.tint = boolean ? 0xff00ff : 0xffffff;
	}
	set selected(boolean){
		this._selected = boolean;
		this.tint = boolean ? 0xff0000 : 0xffffff;
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
	

	add(id, node){
		if( this.keys.indexOf(id) === -1 ){
			console.log( this.tile.toString() + '.content.add', node.id);
			
			// REGISTER THE NEW CONTENT
			this.keys.push(id);
			this.nodes.push(node);

			// GET APPROPRIATE Z-INDEX
			var zIndex = {
				'surface':0,
				'road':1,
				'build':2
			}[ TextureData[node.id].type ];

			// APPEND TO FACE
			node.sprites.forEach( (sprite) => {
				App.Grid.face.add(sprite, zIndex);
			});

		}
	}

	


	// REMOVE CONTENT FROM TILE
	remove(wildcard){
		let regex = new RegExp(wildcard, 'i');

		this.keys.forEach( (v,index,a) => {
			
			// CHECK CONTENT ID WILDCARD IS IN THE KEYS 
			if( regex.test(v) ){
				
				// REMOVE KEY FROM TILE
				let key = this.keys.splice(index,1)[0];

				// REMOVE NODE FROM TILE
				let node = this.nodes.splice(index,1)[0];

				let tileIndex = node.tiles.indexOf(this.tile),
					spriteIndex = tileIndex % node.sprites.length;

				if( !isNaN(spriteIndex) ){
					// REMOVE SPRITE FROM NODE
					node.sprites.splice(spriteIndex,1)[0].destroy();
				}

				// REMOVE TILE FROM NODE
				node.tiles.splice(tileIndex,1);

				console.log( this.tile.toString() + '.content.remove', key) //, node );

			}
		});

	}


	contains(wildcard){
		let regex = new RegExp(wildcard,'i');
		return this.keys.some( (v,i,a) => { return regex.test(v) });
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
