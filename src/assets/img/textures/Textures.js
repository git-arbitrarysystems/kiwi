import grass from './surface_grass.png'
import water from './surface_water.png'
import dirt from './surface_dirt.png'
import sand from './road_sand.png'
import stone from './road_stone.png'
import fruit_tree from './build_fruit_tree.png'
import waterwell from './build_waterwell.png'
import castle from './build_castle.png'
import castle_surface from './build_castle_surface.png'
import pine from './build_pine.png'
import pine_surface from './build_pine_surface.png'


const GhostTile = {
    size: [
        3,
        3
    ],
    modulo: true
};
const Textures  = {
    surface: {
        grass: {
            modulo: true,
            skew: true,
            size: [
                3,
                3
            ],
            images: {
                main: {
                    url: grass,
                    trim: {
                        left: 0,
                        top: 0,
                        width: 512,
                        height: 512
                    }
                }
            },
            type: 'surface',
            orig: {
                left: 0,
                top: 0,
                width: 512,
                height: 512
            }
        },
        water: {
            modulo: true,
            skew: true,
            size: [
                3,
                3
            ],
            images: {
                main: {
                    url: water,
                    trim: {
                        left: 0,
                        top: 0,
                        width: 512,
                        height: 512
                    }
                }
            },
            type: 'surface',
            orig: {
                left: 0,
                top: 0,
                width: 512,
                height: 512
            }
        },
        dirt: {
            modulo: true,
            skew: true,
            size: [
                3,
                3
            ],
            images: {
                main: {
                    url: dirt,
                    trim: {
                        left: 0,
                        top: 0,
                        width: 512,
                        height: 512
                    }
                }
            },
            type: 'surface',
            orig: {
                left: 0,
                top: 0,
                width: 512,
                height: 512
            }
        }
    },
    road: {
        sand: {
            modulo: false,
            skew: true,
            size: [
                1,
                1
            ],
            images: {
                main: {
                    url: sand,
                    trim: {
                        left: 0,
                        top: 0,
                        width: 128,
                        height: 128
                    }
                }
            },
            type: 'road',
            orig: {
                left: 0,
                top: 0,
                width: 128,
                height: 128
            }
        },
        stone: {
            modulo: false,
            skew: true,
            size: [
                1,
                1
            ],
            images: {
                main: {
                    url: stone,
                    trim: {
                        left: 0,
                        top: 0,
                        width: 128,
                        height: 128
                    }
                }
            },
            type: 'road',
            orig: {
                left: 0,
                top: 0,
                width: 128,
                height: 128
            }
        }
    },
    build: {
        fruit_tree: {
            modulo: false,
            skew: false,
            size: [
                2,
                2
            ],
            images: {
                main: {
                    url: fruit_tree,
                    trim: {
                        left: 74,
                        top: 8,
                        width: 437,
                        height: 466
                    }
                }
            },
            type: 'build',
            orig: {
                left: 0,
                top: 0,
                width: 512,
                height: 613
            },
            cutoff: 440
        },
        waterwell: {
            modulo: false,
            skew: false,
            size: [
                1,
                1
            ],
            images: {
                main: {
                    url: waterwell,
                    trim: {
                        left: 34,
                        top: 0,
                        width: 431,
                        height: 524
                    }
                }
            },
            type: 'build',
            orig: {
                left: 0,
                top: 0,
                width: 512,
                height: 613
            },
            cutoff: 470
        },
        castle: {
            modulo: false,
            skew: false,
            size: [
                5,
                5
            ],
            images: {
                main: {
                    url: castle,
                    trim: {
                        left: 29,
                        top: 0,
                        width: 483,
                        height: 490
                    }
                },
                surface: {
                    url: castle_surface,
                    trim: {
                        left: 21,
                        top: 283,
                        width: 491,
                        height: 330
                    }
                }
            },
            type: 'build',
            orig: {
                left: 0,
                top: 0,
                width: 512,
                height: 613
            },
            cutoff: 475
        },
        pine: {
            modulo: false,
            skew: false,
            size: [
                3,
                3
            ],
            images: {
                main: {
                    url: pine,
                    trim: {
                        left: 47,
                        top: 0,
                        width: 405,
                        height: 478
                    }
                },
                surface: {
                    url: pine_surface,
                    trim: {
                        left: 0,
                        top: 271,
                        width: 512,
                        height: 342
                    }
                }
            },
            type: 'build',
            orig: {
                left: 0,
                top: 0,
                width: 512,
                height: 613
            },
            cutoff: 475
        }
    }
};
export {Textures,GhostTile}

if( module.hot ){
	module.hot.dispose( function(){
		window.location.reload();
	});
	module.hot.accept();
	
}

