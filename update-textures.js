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

const _default = {
	modulo:false,
	skew:true,
	size:[1,1]
}

const cpsd = {
	'surface':{
		_default:{
			size:[3,3],
			modulo:true
		}
	},
	'road':{
		_default:{
		}
	},
	'build':{
		_default:{
			skew:false
		},
		castle:{
			size:[6,6]
		},
		castleAlt:{
			size:[4,2]
		},
		s1x1:{
		},
		s2x2:{
			size:[2,2]
		},
		s4x2:{
			size:[4,2]
		},
		s5x2:{
			size:[5,2]
		}
	}
}



function updateTextures(){
	var json = {};
	var m_import = '';

	for(var s in cpsd){
		
		var psd = PSD.fromFile(srcDir + s + '.psd')
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
					id = layer.name.substr(1),
					callback = ( function(n){ return ()=>{ console.log(n) } })(targetDir + name + '... ready');

				layer.image.saveAsPng( targetDir + name ).then( callback );

				// STORE FOR EXPORT
				json[s][id] = Object.assign(
					{},
					_default,
					cpsd[s]._default,
					cpsd[s][id],
					{url:id},
					{ 
						orig:{left:0, top:0, width:width, height:height},
						trim:{left:layer.left, top:layer.top, width:layer.width, height:layer.height}
					}
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


