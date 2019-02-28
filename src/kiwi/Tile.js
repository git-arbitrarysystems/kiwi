import * as PIXI from 'pixi.js';
import {HotModule} from '../../HotModule.js'

class Tile extends PIXI.Sprite{
	constructor(cx,cy){
		super(PIXI.Texture.WHITE);
		this.alpha = 0.5;

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
		if( this.selected ){
			if( window.console ) console.log('Tile.selected', this.cx, this.cy, this.selected);
		}
	}
	get selected(){
		return this._selected;
	}
}

export {Tile};

HotModule(module, Tile);
