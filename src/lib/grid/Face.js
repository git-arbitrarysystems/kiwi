import * as PIXI from 'pixi.js';
import {TextureData} from 'interface/Interface';
import {Stamp} from 'grid/Stamp';
import {App} from 'App';

export class Face extends PIXI.Container{
	constructor(){
		super();
	}
	add(id, tileArray){
		

		var stamp = new Stamp(TextureData[id], tileArray );
		stamp.sprites.forEach( (v,i,a) => {
			this.addChild(v);
		});


		console.log('Face.add', id, TextureData);


	}
}


import {HotModule} from 'HotModule'
HotModule(module, Face);