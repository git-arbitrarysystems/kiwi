import * as PIXI from 'pixi.js';

class Tile extends PIXI.Sprite{
	constructor(cx,cy){
		super(PIXI.Texture.WHITE);
		this.alpha = 0.1;
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
}

Tile.tileWidth = 64;
Tile.tileRatio = 0.666667;
Tile.tileHeight = Tile.tileWidth * Tile.tileRatio;
Tile.tileDiameter = Math.sqrt( Tile.tileHeight*Tile.tileHeight+Tile.tileWidth*Tile.tileWidth);
Tile.halfTileWidth = Tile.tileWidth * 0.5;
Tile.halfTileHeight = Tile.tileHeight * 0.5;
Tile.tileSkewX = Math.atan2( Tile.tileWidth, Tile.tileHeight);
Tile.tileSkewY = Math.atan2( -Tile.tileHeight, Tile.tileWidth);



export {Tile};


import {HotModule} from 'HotModule.js'
HotModule(module, Tile);
