import * as PIXI from 'pixi.js';
import {TextureData} from 'interface/Interface';
import {Stamp} from 'grid/Stamp';
import {App} from 'App';

import {Road} from 'grid/types/Road';
import {Fence} from 'grid/types/Fence';
import {Surface} from 'grid/types/Surface';
import {Build} from 'grid/types/Build';


import map from '../../assets/map.json';
import { save } from 'save-file'




export class Data{
	constructor(){
		this.unpack();
	}

	test(id, toTiles){
		var appendContent = this.add(id, toTiles, true);
		console.log('Data.test', id, appendContent);
		return appendContent;
	}

	remove(wildcard, fromTiles ){
		console.log('Data.remove', wildcard, fromTiles );
		for( var i=fromTiles.length-1; i>=0; i--){
			fromTiles[i].content.remove(wildcard);
			if( fromTiles[i] ) Road.recursiveConnect( fromTiles[i] );
			if( fromTiles[i] ) Fence.recursiveConnect( fromTiles[i] );
		}
		
	}

	destroy(tiles){
		var allNodes = [],
			nodes;

		tiles.forEach( (tile) => {
			nodes = tile.content.getDataNodes('');
			nodes.forEach( (node)=>{
				if( allNodes.indexOf(node) === -1 ) allNodes.push(node);
			});
		});

		// DESTROY NODES
		allNodes.forEach( (node) => {
			this.remove(node.id, node.tiles);
		});

		// REMOVE TILES
		tiles.forEach( (tile) => {
			App.Grid.remove(tile.cx, tile.cy);
		});


		//console.log('Data.destroy', tiles, allNodes );
	}

	add(id, toTiles, testOnly = false){

		var textureData = TextureData[id],
			type = textureData.type;


		//console.log('Data.add', id, textureData);

		// CHECK IF IT CAN BE ADDED
		var appendContent = true;
		for( var i=toTiles.length-1, tile; i>=0 ; i--){
			tile = toTiles[i];
			if( type === 'road' && tile.content.contains('road') ){
				// CLEAR SINGLE TILES
				if( !testOnly ) tile.content.remove('road');
			}else if( type === 'fence' && tile.content.contains('fence') ){
				// CLEAR SINGLE TILES
				if( !testOnly ) tile.content.remove('fence');
			}else if( type === 'surface' && tile.content.contains('surface') 	){
				// NEW SURFACE
				if( !testOnly ) tile.content.remove(type);
			}else if( tile.content.contains(id) || (type === 'build' && tile.content.contains('build')) ){
				// DONT ADD DUPLICATES / DONT OVERLAP BUILDINGS;
				appendContent = false; break;
			}
		}


		if( testOnly ){
			 return appendContent;
		}else if( appendContent){

			// CREATE A STAMP
			let stamp = new Stamp(textureData, toTiles);

			// CREATE A DATA_NODE
			let node = { id:id, tiles:toTiles.slice(0), sprites:stamp.sprites }

			// REGISTER
			node.tiles.forEach( (tile, index) => {

				// FOR ROADS && FENCES EACH NODE IS STORED SEPERATELY
				if( type === 'road' || type === 'fence' ) node = { id:id, tiles:[tile], sprites:[stamp.sprites[index]] };

				tile.content.add(id, node );
			});

			if( id.indexOf('fence') 	!== -1 	) 	Fence.recursiveConnect( node.tiles[0] );
			if( id.indexOf('road') 		!== -1 	) 	Road.recursiveConnect( node.tiles[0] );
			if( id.indexOf('surface') 	!== -1	) 	Surface.neighboursConnect( node.tiles[0] );

		}
	}

	unpack(){
		for( var id in map ){
			for(var c = map[id].length, i=0; i<c; i++){
				var block = map[id][i],
					tiles = [], x, y;
				for( x=block[0];x<block[0]+(block[2]||1);x++){
					for(y=block[1];y<block[1]+(block[3]||1);y++){
						tiles.push( App.Grid.getTile({x:x, y:y}, true, true) );
					}
				}
				this.add(id, tiles);
			}
		}
	}

	store(){
		
		let list = [],
			tiles = App.Grid.tiles;

		var x, y, nodes, i, c, node;


		for(x in tiles ){
			for( y in tiles[x] ){
				nodes = tiles[x][y].content.getDataNodes();
				for(c=nodes.length, i=0; i<c; i++){
					node = nodes[i];
					if( list.indexOf(node) === -1 ){
						list.push(node);
					}
				}
			}
		}


		let data = {};
		for(c=list.length, i=0; i<c; i++){
			node = list[i];
			if( !data[node.id] ) data[node.id] = [];

			// BLOCK FORMAT [left,top,width,height]
			var block = [1000000,1000000,1,1];
			node.tiles.forEach( (tile) => {
				
				block[0] = Math.min(block[0], tile.cx);
				block[1] = Math.min(block[1], tile.cy);
				block[2] = Math.max(tile.cx - block[0] + 1, block[2]);
				block[3] = Math.max(tile.cy - block[1] + 1, block[3]);
			})

			if( block[2] === 1 && block[3] === 1 ){
				block.splice(2,2);
			}

			data[node.id].push( block )

		}


		save( JSON.stringify(data), 'test.json');



	}


}

import {HotModule} from 'HotModule'
HotModule(module, Data);