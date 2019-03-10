import * as PIXI from 'pixi.js';
import {TextureData} from 'interface/Interface';
import {Stamp} from 'grid/Stamp';
import {App} from 'App';
import {Road} from 'grid/Road';
import {Surface} from 'grid/Surface';

export class Data{
	constructor(data){
	}
	test(id, toTiles){
		var appendContent = this.add(id, toTiles, true);
		console.log('Data.test', id, appendContent);
		return appendContent;
	}

	remove(wildcard, fromTiles ){
		console.log('Data.remove', wildcard, fromTiles );
		fromTiles.forEach( (tile) => {
			tile.content.remove(wildcard);
			Road.recursiveConnect( tile );
		});
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
}



import {HotModule} from 'HotModule'
HotModule(module, Data);