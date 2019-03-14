
module.exports = {
	source:'./src/assets/psd/',
	target:'./src/assets/img/textures/',
	DefaultTile:{
		modulo:false,
		skew:true,
		size:[1,1]
	},
	DefaultGhostTile:{
		size:[3,3],
		modulo:true
	}

};


module.exports.Tiles = {
	'surface':{
		_default:{
			size:module.exports.DefaultGhostTile.size,
			modulo:true
		}
	},
	'road':{
		_default:{
		}
	},
	'build':{
		_default:{
			skew:false,
			cutoff:true
		},
		castle:{
			size:[5,5],
			cutoff:475
		},
		pine:{
			size:[3,3],
			cutoff:475
		},
		waterwell:{
			cutoff:470
		},
		fruit_tree:{
			size:[2,2],
			cutoff:440
		}
	}
}