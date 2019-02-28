const PSD = require('./node_modules/psd.js/');


const srcDir = './src/assets/psd/';
const targetDir = './src/assets/img/textures/';
const groups = ['surface', 'road', 'build'];

let json = {};

for(var i=0;i<groups.length;i++){
	
	var psd = PSD.fromFile(srcDir + groups[i] + '.psd')
	psd.parse();

	// CREATE JSON NODE
	json[ groups[i] ] = {};

	// EXPORT LAYERS
	var j, layer;
	for(j in psd.layers){
		layer = psd.layers[j];
		if( layer.name.indexOf('_') === 0 ){
			// EXPORT
			var name = groups[i] + layer.name + '.png';
			var callback = ( function(n){ return ()=>{ console.log(n) } })(targetDir + name + '... ready')
			layer.image.saveAsPng( targetDir + name ).then( callback );

			// INSERT URL
			json[ groups[i] ][layer.name] = targetDir + name;

		}	
	}


}

// WRITE JSON DATA
var fs = require('fs');
fs.writeFile( targetDir + 'index.json' , JSON.stringify(json), 'utf8', function(){
	//console.log('Written JSON:', json)
});


