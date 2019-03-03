/* 
	
	SCRIPT ARGUMENTS
		watch - start watching srcDir
		empty - empty targetDir before creating Textures

*/

const fs = require('fs');
const PSD = require('./node_modules/psd.js/');

const empty = require('empty-folder');
const watch = require('node-watch');


const srcDir = './src/assets/psd/';
const targetDir = './src/assets/img/textures/';

// CONVERT PSD'S
const cpsd = {
	'surface':{
		_default:{
			size:[3,3],
			modulo:true	
		}
	},
	'road':{
		_default:{
			size:[1,1]
		}
	},
	'build':{
		_default:{
			size:[4,2]
		},
		castle:{
			size:[6,6]
		}
	}
}



function updateTextures(){
	var json = {};
	var m_import = '';

	for(var s in cpsd){
		
		var psd = PSD.fromFile(srcDir + s + '.psd')
		psd.parse();


		// CREATE JSON NODE
		json[s] = {};
		

		// EXPORT LAYERS
		var j, layer;
		for(j in psd.layers){
			layer = psd.layers[j];
			
			if( layer.name.indexOf('_') === 0 ){
				// EXPORT
				var name = s + layer.name + '.png',
					id = layer.name.substr(1),
					callback = ( function(n){ return ()=>{ console.log(n) } })(targetDir + name + '... ready');

				layer.image.saveAsPng( targetDir + name ).then( callback );

				// STORE FOR EXPORT
				json[s][id] = Object.assign(
					{},
					cpsd[s]._default,
					cpsd[s][id],
					{url:id},
				)
				
				// ADD IMPORT SCRIPT LINE
				m_import += 'import ' + id + ' from \'./' + name + '\'\n';


			}
		}


	}

	// WRITE JSON DATA
	m_import += '\n\nconst Textures = ' + JSON.stringify(json, null, 4).replace(/\"/g, '') + ';\n\nexport {Textures}';
	fs.writeFile(targetDir + 'Textures.js', m_import, 'utf8', function(){
		console.log(m_import);
	});
}

function wrapper(){
	if( process.argv.indexOf('empty') !== -1 ){
		empty(targetDir, false, function(){
			updateTextures();
		});
	}else{
		updateTextures();
	}
}


if( process.argv.indexOf('watch') !== -1 ){
	watch('./src/assets/psd', { recursive: true }, function(evt, name) {
		console.log('%s changed.', name);
		wrapper();
	})
}else{
	wrapper();
}


