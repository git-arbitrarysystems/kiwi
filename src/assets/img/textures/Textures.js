import surface_grass from './surface_grass.png'
import surface_water from './surface_water.png'
import surface_stone from './surface_stone.png'
import surface_dirt from './surface_dirt.png'
import road_sand from './road_sand.png'
import road_stone from './road_stone.png'
import build_vinyard from './build_vinyard.png'
import build_vinyard_surface from './build_vinyard_surface.png'
import build_dark_hut_1 from './build_dark_hut_1.png'
import build_dark_hut_2 from './build_dark_hut_2.png'
import build_dark_hut_3 from './build_dark_hut_3.png'
import build_temple from './build_temple.png'
import build_berries_blue from './build_berries_blue.png'
import build_hut_with_garden_4 from './build_hut_with_garden_4.png'
import build_berries_red from './build_berries_red.png'
import build_hut_with_garden_3 from './build_hut_with_garden_3.png'
import build_hut_with_garden_3_surface from './build_hut_with_garden_3_surface.png'
import build_hut_with_garden_2 from './build_hut_with_garden_2.png'
import build_hut_with_garden_2_surface from './build_hut_with_garden_2_surface.png'
import build_quarry from './build_quarry.png'
import build_farm from './build_farm.png'
import build_farm_surface from './build_farm_surface.png'
import build_flowers_1 from './build_flowers_1.png'
import build_flowers_1_surface from './build_flowers_1_surface.png'
import build_school from './build_school.png'
import build_school_surface from './build_school_surface.png'
import build_hut_with_garden_1 from './build_hut_with_garden_1.png'
import build_hut_with_garden_1_surface from './build_hut_with_garden_1_surface.png'
import build_fire_1 from './build_fire_1.png'
import build_fire_1_surface from './build_fire_1_surface.png'
import build_hut_2 from './build_hut_2.png'
import build_hut_2_surface from './build_hut_2_surface.png'
import build_hut_1 from './build_hut_1.png'
import build_hut_1_surface from './build_hut_1_surface.png'
import build_pine_2 from './build_pine_2.png'
import build_fruit_tree from './build_fruit_tree.png'
import build_fruit_tree_surface from './build_fruit_tree_surface.png'
import build_waterwell from './build_waterwell.png'
import build_castle from './build_castle.png'
import build_castle_surface from './build_castle_surface.png'
import build_pine_1 from './build_pine_1.png'
import build_pine_1_surface from './build_pine_1_surface.png'


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
                    url: surface_grass,
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
                    url: surface_water,
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
        stone: {
            modulo: true,
            skew: true,
            size: [
                3,
                3
            ],
            images: {
                main: {
                    url: surface_stone,
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
                    url: surface_dirt,
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
                    url: road_sand,
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
                    url: road_stone,
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
                    url: build_vinyard,
                    trim: {
                        left: 3,
                        top: 210,
                        width: 508,
                        height: 315
                    }
                },
                surface: {
                    url: build_vinyard_surface,
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
        dark_hut_1: {
            modulo: false,
            skew: false,
            size: [
                3,
                3
            ],
            images: {
                main: {
                    url: build_dark_hut_1,
                    trim: {
                        left: 55,
                        top: 19,
                        width: 396,
                        height: 445
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
            cutoff: 445
        },
        dark_hut_2: {
            modulo: false,
            skew: false,
            size: [
                3,
                3
            ],
            images: {
                main: {
                    url: build_dark_hut_2,
                    trim: {
                        left: 126,
                        top: 56,
                        width: 333,
                        height: 410
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
            cutoff: 445
        },
        dark_hut_3: {
            modulo: false,
            skew: false,
            size: [
                2,
                2
            ],
            images: {
                main: {
                    url: build_dark_hut_3,
                    trim: {
                        left: 61,
                        top: 166,
                        width: 451,
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
            cutoff: 445
        },
        temple: {
            modulo: false,
            skew: false,
            size: [
                5,
                5
            ],
            images: {
                main: {
                    url: build_temple,
                    trim: {
                        left: 0,
                        top: 81,
                        width: 512,
                        height: 378
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
            cutoff: 444
        },
        berries_blue: {
            modulo: false,
            skew: false,
            size: [
                1,
                1
            ],
            images: {
                main: {
                    url: build_berries_blue,
                    trim: {
                        left: 63,
                        top: 167,
                        width: 403,
                        height: 379
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
            cutoff: 420
        },
        hut_with_garden_4: {
            modulo: false,
            skew: false,
            size: [
                3,
                3
            ],
            images: {
                main: {
                    url: build_hut_with_garden_4,
                    trim: {
                        left: 4,
                        top: 108,
                        width: 504,
                        height: 361
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
            cutoff: 500
        },
        berries_red: {
            modulo: false,
            skew: false,
            size: [
                2,
                1
            ],
            images: {
                main: {
                    url: build_berries_red,
                    trim: {
                        left: 79,
                        top: 286,
                        width: 354,
                        height: 256
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
            cutoff: 450
        },
        hut_with_garden_3: {
            modulo: false,
            skew: false,
            size: [
                4,
                4
            ],
            images: {
                main: {
                    url: build_hut_with_garden_3,
                    trim: {
                        left: 13,
                        top: 110,
                        width: 482,
                        height: 437
                    }
                },
                surface: {
                    url: build_hut_with_garden_3_surface,
                    trim: {
                        left: 13,
                        top: 102,
                        width: 494,
                        height: 509
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
            cutoff: 450
        },
        hut_with_garden_2: {
            modulo: false,
            skew: false,
            size: [
                3,
                3
            ],
            images: {
                main: {
                    url: build_hut_with_garden_2,
                    trim: {
                        left: 172,
                        top: 197,
                        width: 328,
                        height: 272
                    }
                },
                surface: {
                    url: build_hut_with_garden_2_surface,
                    trim: {
                        left: 124,
                        top: 345,
                        width: 335,
                        height: 210
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
        quarry: {
            modulo: false,
            skew: false,
            size: [
                4,
                4
            ],
            images: {
                main: {
                    url: build_quarry,
                    trim: {
                        left: 32,
                        top: 110,
                        width: 450,
                        height: 391
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
        farm: {
            modulo: false,
            skew: false,
            size: [
                4,
                4
            ],
            images: {
                main: {
                    url: build_farm,
                    trim: {
                        left: 114,
                        top: 278,
                        width: 244,
                        height: 156
                    }
                },
                surface: {
                    url: build_farm_surface,
                    trim: {
                        left: 67,
                        top: 335,
                        width: 379,
                        height: 241
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
            cutoff: 425
        },
        flowers_1: {
            modulo: false,
            skew: false,
            size: [
                1,
                1
            ],
            images: {
                main: {
                    url: build_flowers_1,
                    trim: {
                        left: 98,
                        top: 261,
                        width: 303,
                        height: 233
                    }
                },
                surface: {
                    url: build_flowers_1_surface,
                    trim: {
                        left: 0,
                        top: 271,
                        width: 503,
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
            cutoff: 440
        },
        school: {
            modulo: false,
            skew: false,
            size: [
                3,
                3
            ],
            images: {
                main: {
                    url: build_school,
                    trim: {
                        left: 38,
                        top: 50,
                        width: 466,
                        height: 288
                    }
                },
                surface: {
                    url: build_school_surface,
                    trim: {
                        left: 12,
                        top: 257,
                        width: 495,
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
            cutoff: 313
        },
        hut_with_garden_1: {
            modulo: false,
            skew: false,
            size: [
                3,
                3
            ],
            images: {
                main: {
                    url: build_hut_with_garden_1,
                    trim: {
                        left: 0,
                        top: 156,
                        width: 455,
                        height: 313
                    }
                },
                surface: {
                    url: build_hut_with_garden_1_surface,
                    trim: {
                        left: 4,
                        top: 390,
                        width: 472,
                        height: 186
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
        fire_1: {
            modulo: false,
            skew: false,
            size: [
                1,
                1
            ],
            images: {
                main: {
                    url: build_fire_1,
                    trim: {
                        left: 166,
                        top: 246,
                        width: 162,
                        height: 264
                    }
                },
                surface: {
                    url: build_fire_1_surface,
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
                    url: build_hut_2,
                    trim: {
                        left: 63,
                        top: 287,
                        width: 366,
                        height: 176
                    }
                },
                surface: {
                    url: build_hut_2_surface,
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
                    url: build_hut_1,
                    trim: {
                        left: 111,
                        top: 239,
                        width: 396,
                        height: 275
                    }
                },
                surface: {
                    url: build_hut_1_surface,
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
                    url: build_pine_2,
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
                    url: build_fruit_tree,
                    trim: {
                        left: 124,
                        top: 110,
                        width: 328,
                        height: 362
                    }
                },
                surface: {
                    url: build_fruit_tree_surface,
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
                    url: build_waterwell,
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
                    url: build_castle,
                    trim: {
                        left: 27,
                        top: 0,
                        width: 483,
                        height: 487
                    }
                },
                surface: {
                    url: build_castle_surface,
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
                    url: build_pine_1,
                    trim: {
                        left: 47,
                        top: 0,
                        width: 405,
                        height: 478
                    }
                },
                surface: {
                    url: build_pine_1_surface,
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

