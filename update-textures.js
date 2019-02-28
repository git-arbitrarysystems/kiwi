const fs = require('fs');
const PSD = require('./node_modules/psd.js/');


const srcDir = './src/assets/psd/';
const targetDir = './src/assets/img/textures/';
const groups = ['surface', 'road', 'build'];

var json = {};

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
json = JSON.stringify(json, null, 4);
fs.writeFile( targetDir + 'index.json' , json, 'utf8', function(){
	if( window.console ) console.log(json);
});


