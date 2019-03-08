import * as PIXI from 'pixi.js';
import {TextureData} from 'interface/Interface';
import {Stamp} from 'grid/Stamp';
import {Data} from 'grid/Data';
import {App} from 'App';

export class Face extends PIXI.Container{
	constructor(){
		super();
		this.sortableChildren = true;
	}
	add( sprite, zIndex = 0){
		// ALREADY ADDED
		if( sprite.parent === this ) return;

		
		//console.log('Face.add', sprite.texture.textureCacheIds[0], zIndex);
		sprite.zIndex = (zIndex * 100000000 ) + sprite.y - sprite.height * sprite.anchor.y;
		sprite.alpha = 0.5;
		this.addChild(sprite);
		
	}
}


import {HotModule} from 'HotModule'
HotModule(module, Face);