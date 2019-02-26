const PSD = require('./node_modules/psd.js/');

const psd = PSD.fromFile('./src/assets/img/textures.psd');
psd.parse()

var i,
	layer,
	dir = './src/assets/img/',
	file;
for(i in psd.layers){
	layer = psd.layers[i];
	if( layer.name.indexOf('_') === 0 ){
		// EXPORT
		file = layer.name + '.png';
		layer.image.saveAsPng(dir + file).then( function(){
			console.log('exported:', dir + file );
		});
	}	
}