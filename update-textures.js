const fs = require('fs');
const PSD = require('./node_modules/psd.js/');
var watch = require('node-watch');


const srcDir = './src/assets/psd/';
const targetDir = './src/assets/img/textures/';
const groups = ['surface', 'road', 'build'];

watch('./src/assets/psd', { recursive: true }, function(evt, name) {

	console.log('%s changed.', name);

	var json = {};
	var m_import = '';

	for(var i=0;i<groups.length;i++){
		
		var psd = PSD.fromFile(srcDir + groups[i] + '.psd')
		psd.parse();


		// CREATE JSON NODE
		json[ groups[i] ] = {};
		

		// EXPORT LAYERS
		var j, layer;
		for(j in psd.layers){
			layer = psd.layers[j];

			if( groups[i] === 'road' && layer.name === '_stone' ){
				console.log('\n\n\n\n' , layer, '\n\n\n\n');
			}
			

			if( layer.name.indexOf('_') === 0 ){
				// EXPORT
				var name = groups[i] + layer.name + '.png',
					id = layer.name.substr(1),
					callback = ( function(n){ return ()=>{ console.log(n) } })(targetDir + name + '... ready');

				layer.image.saveAsPng( targetDir + name ).then( callback );

				// STORE FOR EXPORT
				json[ groups[i] ][id] = id;
				m_import += 'import ' + id + ' from \'./' + name + '\'\n';


			}
		}


	}

	// WRITE JSON DATA
	m_import += '\n\nconst Textures = ' + JSON.stringify(json).replace(/\"/g, '') + ';\n\nexport {Textures}';
	fs.writeFile(targetDir + 'Textures.js', m_import, 'utf8', function(){
		console.log(m_import);
	});

})
