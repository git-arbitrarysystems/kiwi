import * as PIXI from 'pixi.js';
import {TextureData} from 'interface/Interface';
import {Stamp} from 'grid/Stamp';
import {App} from 'App';

export class Face extends PIXI.Container{
	constructor(){
		super();

		this.registry = {};
		this.sortableChildren = true;

	}
	add(id, tileArray){
		

		var stamp = new Stamp( TextureData[id], tileArray );

		var zIndex = 0;
		if( id.indexOf('road/')  === 0 ) zIndex = 100000; 
		if( id.indexOf('build/') === 0 ) zIndex = 200000;

		

		var registryItem = {
			id:id,
			sprites:stamp.sprites,
			tiles:[]
		};
		tileArray.forEach( (tile)=>{
			registryItem.tiles.push(tile.cx);
			registryItem.tiles.push(tile.cy);
		});
		if( !this.registry.hasOwnProperty(id) ){
			this.registry[id] = [];
		}
		this.registry[id].push(registryItem);


		stamp.sprites.forEach( (v,i,a) => {
			v.zIndex = zIndex + v.y - v.height * v.anchor.y;
			v.alpha = 0.5;
			this.addChild(v);

			//console.log(v.z, v.zIndex);
		});


		console.log('Face.add', id, zIndex);


	}
}


import {HotModule} from 'HotModule'
HotModule(module, Face);