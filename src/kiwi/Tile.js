import * as PIXI from 'pixi.js';

export class Tile extends PIXI.Sprite{
	constructor(cx,cy){
		super(PIXI.Texture.WHITE);
		this.alpha = 0.5;

		this.cx = cx;
		this.cy = cy;

	}
	set hover(boolean){
		this._hover = boolean;
		if( !this._selected ) this.tint = boolean ? 0xff0000 : 0xffffff;
	}
	set selected(boolean){
		this._selected = boolean;
		this.tint = boolean ? 0x00ffff : 0xffffff;
		if( this._selected ){
			if( window.console ) console.log('Tile.selected', this.cx, this.cy);
		}
	}
}