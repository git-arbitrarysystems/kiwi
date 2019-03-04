import * as PIXI from 'pixi.js';
import {Transform} from 'grid/Transform';

export class Stamp extends PIXI.Sprite{
	constructor(){
		super();
	}
	update(interfaceSelection){
		this.texture = PIXI.Texture.from(interfaceSelection.url);
		
		this.texture.orig = new PIXI.Rectangle( 0,0,interfaceSelection.orig.width,interfaceSelection.orig.height);
		this.texture.trim = new PIXI.Rectangle( interfaceSelection.trim.left, interfaceSelection.trim.top, interfaceSelection.trim.width, interfaceSelection.trim.height );;
		this.texture.updateUvs();

		if( this.texture.width === 1 ){ // TEXTURE IS NOT LOADED YET
			this.texture.on('update', (e)=>{ this.gridTransform(interfaceSelection); })
		}else{
			this.gridTransform(interfaceSelection)
		}
	}
	gridTransform(interfaceSelection){
		console.log('Stamp.updateTransform', interfaceSelection.size, interfaceSelection.skew);
		Transform.transform(this, interfaceSelection.size[0], interfaceSelection.skew);
	}
	frame(limits, anchor){
		this.x = ( limits.left + limits.right ) * 0.5;
		this.y = limits.top + limits.height * anchor.y
		this.alpha = 0.5;
		
		this.anchor.set(anchor.x, anchor.y);
		
	}
}

import {HotModule} from 'HotModule'
HotModule(module, Stamp);