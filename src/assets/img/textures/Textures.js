import grass from './surface_grass.png'
import water from './surface_water.png'
import dirt from './surface_dirt.png'
import sand from './road_sand.png'
import stone from './road_stone.png'
import vinyard from './build_vinyard.png'
import vinyard_surface from './build_vinyard_surface.png'
import fire_1 from './build_fire_1.png'
import fire_1_surface from './build_fire_1_surface.png'
import hut_2 from './build_hut_2.png'
import hut_2_surface from './build_hut_2_surface.png'
import hut_1 from './build_hut_1.png'
import hut_1_surface from './build_hut_1_surface.png'
import pine_2 from './build_pine_2.png'
import fruit_tree from './build_fruit_tree.png'
import fruit_tree_surface from './build_fruit_tree_surface.png'
import waterwell from './build_waterwell.png'
import castle from './build_castle.png'
import castle_surface from './build_castle_surface.png'
import pine_1 from './build_pine_1.png'
import pine_1_surface from './build_pine_1_surface.png'


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
        vinyard: {
            modulo: false,
            skew: false,
            size: [
                6,
                6
            ],
            images: {
                main: {
                    url: vinyard,
                    trim: {
                        left: 3,
                        top: 210,
                        width: 508,
                        height: 315
                    }
                },
                surface: {
                    url: vinyard_surface,
                    trim: {
                        left: 1,
                        top: 408,
                        width: 510,
                        height: 194
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
            cutoff: 495
        },
        fire_1: {
            modulo: false,
            skew: false,
            size: [
                1,
                1
            ],
            images: {
                main: {
                    url: fire_1,
                    trim: {
                        left: 166,
                        top: 246,
                        width: 162,
                        height: 264
                    }
                },
                surface: {
                    url: fire_1_surface,
                    trim: {
                        left: 40,
                        top: 239,
                        width: 415,
                        height: 313
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
            cutoff: 490
        },
        hut_2: {
            modulo: false,
            skew: false,
            size: [
                2,
                1
            ],
            images: {
                main: {
                    url: hut_2,
                    trim: {
                        left: 63,
                        top: 287,
                        width: 366,
                        height: 176
                    }
                },
                surface: {
                    url: hut_2_surface,
                    trim: {
                        left: 45,
                        top: 308,
                        width: 180,
                        height: 211
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
            cutoff: 460
        },
        hut_1: {
            modulo: false,
            skew: false,
            size: [
                1,
                2
            ],
            images: {
                main: {
                    url: hut_1,
                    trim: {
                        left: 111,
                        top: 239,
                        width: 396,
                        height: 275
                    }
                },
                surface: {
                    url: hut_1_surface,
                    trim: {
                        left: 3,
                        top: 340,
                        width: 377,
                        height: 215
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
            cutoff: 460
        },
        pine_2: {
            modulo: false,
            skew: false,
            size: [
                1,
                1
            ],
            images: {
                main: {
                    url: pine_2,
                    trim: {
                        left: 35,
                        top: 19,
                        width: 423,
                        height: 569
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
            cutoff: 514
        },
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
                        left: 124,
                        top: 110,
                        width: 328,
                        height: 362
                    }
                },
                surface: {
                    url: fruit_tree_surface,
                    trim: {
                        left: 4,
                        top: 253,
                        width: 503,
                        height: 335
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
                        left: 27,
                        top: -2,
                        width: 483,
                        height: 489
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
            cutoff: 465
        },
        pine_1: {
            modulo: false,
            skew: false,
            size: [
                3,
                3
            ],
            images: {
                main: {
                    url: pine_1,
                    trim: {
                        left: 47,
                        top: 0,
                        width: 405,
                        height: 478
                    }
                },
                surface: {
                    url: pine_1_surface,
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

