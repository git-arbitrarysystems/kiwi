import * as PIXI from 'pixi.js';


class TileContent extends Array{
	constructor( ...items){
		super(items)
	}
	add(id){
		if( this.indexOf(id) === -1 ){
			console.log('TileContent.add', id);
			this.push(id);
		}
	}
	remove(id){
		let index = this.indexOf(id);
		if( index !== -1 ){
			this.splice(index,1);
			console.log('TileContent.remove', this.join(',') );
		}
	}
	toString(){
		return '[' + this.join(',') + ']'
	}
}

class Tile extends PIXI.Sprite{
	constructor(cx,cy){
		super(PIXI.Texture.WHITE);

		this.content = new TileContent();

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
		return '[Tile '+this.cx+' '+this.cy+']' + this.content.toString() ;
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



export {Tile, TileContent};


import {HotModule} from 'HotModule.js'
HotModule(module, Tile, TileContent);
