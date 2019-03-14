/* 
	
	SCRIPT ARGUMENTS
		watch - start watching srcDir
		empty - empty targetDir before creating Textures

*/

const fs = require('fs');
const PSD = require('./node_modules/psd.js/');

const empty = require('empty-folder');
const watch = require('node-watch');


var settings = require('./update-textures-settings.js');




function updateTextures(){
	var json = {};
	var m_import = '';

	for(var s in settings.Tiles){
		
		var psd = PSD.fromFile(settings.source + s + '.psd')
		psd.parse();


		// UPDATE PSD SIZE


		// CREATE JSON NODE
		json[s] = {};
		
		var width = psd.tree().width,
			height = psd.tree().height;

		// EXPORT LAYERS
		var j, layer;
		for(j in psd.layers){
			layer = psd.layers[j];
			
			if( layer.name.indexOf('_') === 0 ){
				// EXPORT
				var name = s + layer.name + '.png',
					id = layer.name.substr(1).replace('_surface', ''),
					callback = ( function(n){ return ()=>{ console.log(n) } })(settings.target + name + '... ready');

				if( !json[s][id] ){
					json[s][id] = Object.assign(
						{},
						settings.DefaultTile,
						{
							images:{},
							type:'\''+s+'\'',
							orig:{left:0, top:0, width:width, height:height}
						},
						settings.Tiles[s]._default,
						settings.Tiles[s][id]
					);
				}

				layer.image.saveAsPng( settings.target + name ).then( callback );
				
			
				
				if( layer.name.indexOf('_surface') !== -1 ){
					json[s][id].images = Object.assign(json[s][id].images, {surface:{
						url:layer.name.substr(1),
						trim:{left:layer.left, top:layer.top, width:layer.width, height:layer.height}
					}});
				}else{
					json[s][id].images = Object.assign(json[s][id].images, {main:{
						url:layer.name.substr(1),
						trim:{left:layer.left, top:layer.top, width:layer.width, height:layer.height}
					}});
				}
				
				console.log(id, layer.name);

				// ADD IMPORT SCRIPT LINE
				m_import += 'import ' + layer.name.substr(1) + ' from \'./' + name + '\'\n';


			}
		}


	}

	console.log(m_import);


	// WRITE JSON DATA
	m_import += `

const GhostTile = ${JSON.stringify(settings.DefaultGhostTile,null,4).replace(/\"/g, '')};
const Textures  = ${JSON.stringify(json, null, 4).replace(/\"/g, '')};
export {Textures,GhostTile}

if( module.hot ){
	module.hot.dispose( function(){
		window.location.reload();
	});
	module.hot.accept();
	
}

`;
	fs.writeFile(settings.target + 'Textures.js', m_import, 'utf8', function(){
		//console.log(m_import);
	});
}

function wrapper(){
	if( process.argv.indexOf('empty') !== -1 ){
		empty(settings.target, false, function(){
			updateTextures();
		});
	}else{
		updateTextures();
	}
}


if( process.argv.indexOf('watch') !== -1 ){

	watch('./update-textures-settings.js', {}, function(evt, name){
		console.log('%s has changed.', name);
		delete require.cache[require.resolve('./update-textures-settings.js')]
		settings = require('./update-textures-settings.js');
		wrapper();
	})

	watch(settings.source, { recursive: true }, function(evt, name) {
		console.log('%s has changed.', name);
		wrapper();
	})
}else{
	wrapper();
}


