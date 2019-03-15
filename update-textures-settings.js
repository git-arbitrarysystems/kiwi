
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
			cutoff:465
		},
		temple:{
			size:[5,5],
			cutoff:435
		},
		
		pine_1:{
			size:[3,3],
			cutoff:475
		},
		pine_2:{
			cutoff:514
		},
		
		hut_1:{
			size:[1,2],
			cutoff:460
		},
		hut_2:{
			size:[2,1],
			cutoff:460
		},
		hut_with_garden_1:{
			size:[3,3],
			cutoff:465
		},
		hut_with_garden_2:{
			size:[3,3],
			cutoff:440
		},
		hut_with_garden_3:{
			size:[4,4],
			cutoff:450
		},
		hut_with_garden_4:{
			size:[3,3],
			cutoff:500
		},
		fire_1:{
			size:[1,1],
			cutoff:490
		},
		waterwell:{
			cutoff:470
		},
		fruit_tree:{
			size:[2,2],
			cutoff:440
		},
		vinyard:{
			size:[6,6],
			cutoff:495
		},
		school:{
			size:[3,3],
			cutoff:313
		},
		flowers_1:{
			cutoff:440
		},
		berries_red:{
			size:[2,1],
			cutoff:450
		},
		berries_blue:{
			cutoff:420
		},
		farm:{
			size:[4,4],
			cutoff:425
		},
		quarry:{
			size:[4,4],
			cutoff:465
		}

	}
}








