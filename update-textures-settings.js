
module.exports = {
	source:'./src/assets/psd/',
	target:'./src/assets/img/textures/',
	DefaultTile:{
		modulo:false,
		skewX:true,
		skewY:true,
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
	'fence':{
		_default:{
			skewX:false,
			skewY:true
		}
	},
	'build':{
		_default:{
			skewX:false,
			skewY:false,
			cutoff:true
		},
		castle:{
			size:[5,5],
			cutoff:465
		},
		temple:{
			size:[5,5],
			cutoff:444
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
		hut_with_garden_5:{
			size:[3,3],
			cutoff:560
		},
		hut_with_garden_6:{
			size:[3,3],
			cutoff:430
		},
		small_forest:{
			size:[3,3],
			cutoff:565
		},
		dark_hut_1:{
			size:[3,3],
			cutoff:445
		},
		dark_hut_2:{
			size:[3,3],
			cutoff:445
		},
		dark_hut_3:{
			size:[3,3],
			cutoff:445
		},
		palmtree_with_hut:{
			size:[2,2],
			cutoff:450
		},
		palmtree_1:{
			cutoff:500
		},
		palmtree_2:{
			cutoff:500
		},
		palmtree_3:{
			cutoff:500
		},
		palmtree_4:{
			cutoff:500
		},
		red_tent:{
			cutoff:445
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
		},
		lake_1:{
			size:[5,5],
			cutoff:360
		},
		lake_2:{
			size:[2,2],
			cutoff:390
		},
		tiny_island:{
			cutoff:512
		},
		volcano:{
			size:[5,5],
			cutoff:440
		},
		defense_tree_1:{
			size:[2,2],
			cutoff:525
		},
		defense_tree_2:{
			size:[2,2],
			cutoff:507
		},
		defense_tree_dark_1:{
			size:[2,2],
			cutoff:475
		},
		defense_tree_dark_2:{
			size:[2,2],
			cutoff:475
		},
		defense_tree_dark_3:{
			size:[2,2],
			cutoff:475
		},
		catapult_1:{
			size:[2,1],
			cutoff:565
		},
		catapult_2:{
			size:[3,1],
			cutoff:530
		}

	}
}








