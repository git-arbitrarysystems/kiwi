import * as PIXI from 'pixi.js';
import {TextureData} from 'interface/Interface';
import {Stamp} from 'grid/Stamp';
import {App} from 'App';
import {Road} from 'grid/Road';
import {Surface} from 'grid/Surface';


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

		// DETROY NODES
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

		// CHECK IF IT CAN BE ADDED
		var appendContent = true;
		for( var i=toTiles.length-1, tile; i>=0 ; i--){
			tile = toTiles[i];
			if( type === 'road' && tile.content.contains('road') ){
				// CLEAR SINGLE TILES
				if( !testOnly ) tile.content.remove('road');
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

			console.log('Data.add',id);

			// CREATE A STAMP
			let stamp = new Stamp(textureData, toTiles);

			// CREATE A DATA_NODE
			let node = { id:id, tiles:toTiles.slice(0), sprites:stamp.sprites }

			// REGISTER
			node.tiles.forEach( (tile, index) => {

				// FOR ROADS EACH NODE IS STORED SEPERATELY
				if( type === 'road' ) node = { id:id, tiles:[tile], sprites:[stamp.sprites[index]] };

				tile.content.add(id, node );
			});

			if( id.indexOf('road') !== -1 	) Road.recursiveConnect( node.tiles[0] );
			if( id.indexOf('surface') !== -1	) Surface.neighboursConnect( node.tiles[0] );

		}
	}

	unpack(){
		for( var id in map ){
			for(var c = map[id].length, i=0; i<c; i++){
				var coordinates = map[id][i],
					tiles = [];
				for(var l=coordinates.length, j=0; j<l; j+=2){
					tiles.push( App.Grid.getTile({x:coordinates[j], y:coordinates[j+1]}, true, true) );
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

			var coordinates = [];
			node.tiles.forEach( (tile) => { coordinates.push(tile.cx, tile.cy); })
			data[node.id].push( coordinates )

		}


		save( JSON.stringify(data), 'test.json');



	}


}

import {HotModule} from 'HotModule'
HotModule(module, Data);