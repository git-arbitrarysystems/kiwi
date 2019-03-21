import surface_grass from './surface_grass.png'
import surface_water from './surface_water.png'
import surface_stone from './surface_stone.png'
import surface_dirt from './surface_dirt.png'
import road_sand from './road_sand.png'
import road_stone from './road_stone.png'
import fence_low_wood from './fence_low_wood.png'
import fence_high_wood from './fence_high_wood.png'
import build_palmtree_with_hut from './build_palmtree_with_hut.png'
import build_palmtree_with_hut_surface from './build_palmtree_with_hut_surface.png'
import build_palmtree_4 from './build_palmtree_4.png'
import build_palmtree_3 from './build_palmtree_3.png'
import build_palmtree_2 from './build_palmtree_2.png'
import build_palmtree_1 from './build_palmtree_1.png'
import build_small_forest from './build_small_forest.png'
import build_small_forest_surface from './build_small_forest_surface.png'
import build_catapult_2 from './build_catapult_2.png'
import build_catapult_2_surface from './build_catapult_2_surface.png'
import build_catapult_1 from './build_catapult_1.png'
import build_catapult_1_surface from './build_catapult_1_surface.png'
import build_defense_tree_dark_3 from './build_defense_tree_dark_3.png'
import build_defense_tree_dark_2 from './build_defense_tree_dark_2.png'
import build_defense_tree_dark_1 from './build_defense_tree_dark_1.png'
import build_defense_tree_1 from './build_defense_tree_1.png'
import build_defense_tree_2 from './build_defense_tree_2.png'
import build_volcano from './build_volcano.png'
import build_volcano_surface from './build_volcano_surface.png'
import build_tiny_island_surface from './build_tiny_island_surface.png'
import build_tiny_island from './build_tiny_island.png'
import build_vinyard from './build_vinyard.png'
import build_vinyard_surface from './build_vinyard_surface.png'
import build_lake_2 from './build_lake_2.png'
import build_lake_1 from './build_lake_1.png'
import build_red_tent from './build_red_tent.png'
import build_dark_hut_1 from './build_dark_hut_1.png'
import build_dark_hut_2 from './build_dark_hut_2.png'
import build_dark_hut_3 from './build_dark_hut_3.png'
import build_temple from './build_temple.png'
import build_berries_blue from './build_berries_blue.png'
import build_berries_red from './build_berries_red.png'
import build_quarry from './build_quarry.png'
import build_farm from './build_farm.png'
import build_farm_surface from './build_farm_surface.png'
import build_flowers_1 from './build_flowers_1.png'
import build_flowers_1_surface from './build_flowers_1_surface.png'
import build_school from './build_school.png'
import build_school_surface from './build_school_surface.png'
import build_hut_with_garden_5 from './build_hut_with_garden_5.png'
import build_hut_with_garden_5_surface from './build_hut_with_garden_5_surface.png'
import build_hut_with_garden_6_surface from './build_hut_with_garden_6_surface.png'
import build_hut_with_garden_6 from './build_hut_with_garden_6.png'
import build_hut_with_garden_4 from './build_hut_with_garden_4.png'
import build_hut_with_garden_3 from './build_hut_with_garden_3.png'
import build_hut_with_garden_3_surface from './build_hut_with_garden_3_surface.png'
import build_hut_with_garden_2 from './build_hut_with_garden_2.png'
import build_hut_with_garden_2_surface from './build_hut_with_garden_2_surface.png'
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
            skewX: true,
            skewY: true,
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
            skewX: true,
            skewY: true,
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
            skewX: true,
            skewY: true,
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
            skewX: true,
            skewY: true,
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
            skewX: true,
            skewY: true,
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
            skewX: true,
            skewY: true,
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
    fence: {
        low_wood: {
            modulo: false,
            skewX: false,
            skewY: true,
            size: [
                1,
                1
            ],
            images: {
                main: {
                    url: fence_low_wood,
                    trim: {
                        left: 0,
                        top: 328,
                        width: 256,
                        height: 179
                    }
                }
            },
            type: 'fence',
            orig: {
                left: 0,
                top: 0,
                width: 256,
                height: 512
            }
        },
        high_wood: {
            modulo: false,
            skewX: false,
            skewY: true,
            size: [
                1,
                1
            ],
            images: {
                main: {
                    url: fence_high_wood,
                    trim: {
                        left: 0,
                        top: 112,
                        width: 256,
                        height: 400
                    }
                }
            },
            type: 'fence',
            orig: {
                left: 0,
                top: 0,
                width: 256,
                height: 512
            }
        }
    },
    build: {
        palmtree_with_hut: {
            modulo: false,
            skewX: false,
            skewY: false,
            size: [
                2,
                2
            ],
            images: {
                main: {
                    url: build_palmtree_with_hut,
                    trim: {
                        left: 2,
                        top: 227,
                        width: 518,
                        height: 240
                    }
                },
                surface: {
                    url: build_palmtree_with_hut_surface,
                    trim: {
                        left: -8,
                        top: 175,
                        width: 518,
                        height: 380
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
        palmtree_4: {
            modulo: false,
            skewX: false,
            skewY: false,
            size: [
                1,
                1
            ],
            images: {
                main: {
                    url: build_palmtree_4,
                    trim: {
                        left: 38,
                        top: 57,
                        width: 459,
                        height: 471
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
        palmtree_3: {
            modulo: false,
            skewX: false,
            skewY: false,
            size: [
                1,
                1
            ],
            images: {
                main: {
                    url: build_palmtree_3,
                    trim: {
                        left: -59,
                        top: 0,
                        width: 537,
                        height: 528
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
        palmtree_2: {
            modulo: false,
            skewX: false,
            skewY: false,
            size: [
                1,
                1
            ],
            images: {
                main: {
                    url: build_palmtree_2,
                    trim: {
                        left: 5,
                        top: 46,
                        width: 497,
                        height: 468
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
        palmtree_1: {
            modulo: false,
            skewX: false,
            skewY: false,
            size: [
                1,
                1
            ],
            images: {
                main: {
                    url: build_palmtree_1,
                    trim: {
                        left: 57,
                        top: 119,
                        width: 463,
                        height: 462
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
        small_forest: {
            modulo: false,
            skewX: false,
            skewY: false,
            size: [
                3,
                3
            ],
            images: {
                main: {
                    url: build_small_forest,
                    trim: {
                        left: -10,
                        top: 300,
                        width: 512,
                        height: 328
                    }
                },
                surface: {
                    url: build_small_forest_surface,
                    trim: {
                        left: -10,
                        top: 194,
                        width: 512,
                        height: 434
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
            cutoff: 565
        },
        catapult_2: {
            modulo: false,
            skewX: false,
            skewY: false,
            size: [
                3,
                1
            ],
            images: {
                main: {
                    url: build_catapult_2,
                    trim: {
                        left: 100,
                        top: 225,
                        width: 135,
                        height: 312
                    }
                },
                surface: {
                    url: build_catapult_2_surface,
                    trim: {
                        left: 79,
                        top: 130,
                        width: 508,
                        height: 447
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
            cutoff: 530
        },
        catapult_1: {
            modulo: false,
            skewX: false,
            skewY: false,
            size: [
                2,
                1
            ],
            images: {
                main: {
                    url: build_catapult_1,
                    trim: {
                        left: 17,
                        top: 21,
                        width: 417,
                        height: 560
                    }
                },
                surface: {
                    url: build_catapult_1_surface,
                    trim: {
                        left: 22,
                        top: 149,
                        width: 369,
                        height: 456
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
            cutoff: 565
        },
        defense_tree_dark_3: {
            modulo: false,
            skewX: false,
            skewY: false,
            size: [
                2,
                2
            ],
            images: {
                main: {
                    url: build_defense_tree_dark_3,
                    trim: {
                        left: 102,
                        top: 11,
                        width: 399,
                        height: 469
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
        defense_tree_dark_2: {
            modulo: false,
            skewX: false,
            skewY: false,
            size: [
                2,
                2
            ],
            images: {
                main: {
                    url: build_defense_tree_dark_2,
                    trim: {
                        left: 2,
                        top: 0,
                        width: 480,
                        height: 474
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
        defense_tree_dark_1: {
            modulo: false,
            skewX: false,
            skewY: false,
            size: [
                2,
                2
            ],
            images: {
                main: {
                    url: build_defense_tree_dark_1,
                    trim: {
                        left: 57,
                        top: 14,
                        width: 451,
                        height: 471
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
        defense_tree_1: {
            modulo: false,
            skewX: false,
            skewY: false,
            size: [
                2,
                2
            ],
            images: {
                main: {
                    url: build_defense_tree_1,
                    trim: {
                        left: 54,
                        top: 0,
                        width: 392,
                        height: 544
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
            cutoff: 525
        },
        defense_tree_2: {
            modulo: false,
            skewX: false,
            skewY: false,
            size: [
                2,
                2
            ],
            images: {
                main: {
                    url: build_defense_tree_2,
                    trim: {
                        left: 56,
                        top: 0,
                        width: 456,
                        height: 527
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
            cutoff: 507
        },
        volcano: {
            modulo: false,
            skewX: false,
            skewY: false,
            size: [
                5,
                5
            ],
            images: {
                main: {
                    url: build_volcano,
                    trim: {
                        left: 29,
                        top: 69,
                        width: 449,
                        height: 391
                    }
                },
                surface: {
                    url: build_volcano_surface,
                    trim: {
                        left: 20,
                        top: 397,
                        width: 490,
                        height: 190
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
        tiny_island: {
            modulo: false,
            skewX: false,
            skewY: false,
            size: [
                1,
                1
            ],
            images: {
                surface: {
                    url: build_tiny_island_surface,
                    trim: {
                        left: 84,
                        top: 341,
                        width: 324,
                        height: 235
                    }
                },
                main: {
                    url: build_tiny_island,
                    trim: {
                        left: 174,
                        top: 287,
                        width: 195,
                        height: 227
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
            cutoff: 512
        },
        vinyard: {
            modulo: false,
            skewX: false,
            skewY: false,
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
        lake_2: {
            modulo: false,
            skewX: false,
            skewY: false,
            size: [
                2,
                2
            ],
            images: {
                main: {
                    url: build_lake_2,
                    trim: {
                        left: 42,
                        top: 284,
                        width: 366,
                        height: 273
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
            cutoff: 390
        },
        lake_1: {
            modulo: false,
            skewX: false,
            skewY: false,
            size: [
                5,
                5
            ],
            images: {
                main: {
                    url: build_lake_1,
                    trim: {
                        left: 0,
                        top: 249,
                        width: 512,
                        height: 364
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
            cutoff: 360
        },
        red_tent: {
            modulo: false,
            skewX: false,
            skewY: false,
            size: [
                1,
                1
            ],
            images: {
                main: {
                    url: build_red_tent,
                    trim: {
                        left: 63,
                        top: 135,
                        width: 413,
                        height: 406
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
        dark_hut_1: {
            modulo: false,
            skewX: false,
            skewY: false,
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
            skewX: false,
            skewY: false,
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
            skewX: false,
            skewY: false,
            size: [
                3,
                3
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
            skewX: false,
            skewY: false,
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
            skewX: false,
            skewY: false,
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
        berries_red: {
            modulo: false,
            skewX: false,
            skewY: false,
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
        quarry: {
            modulo: false,
            skewX: false,
            skewY: false,
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
            skewX: false,
            skewY: false,
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
            skewX: false,
            skewY: false,
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
            skewX: false,
            skewY: false,
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
        hut_with_garden_5: {
            modulo: false,
            skewX: false,
            skewY: false,
            size: [
                3,
                3
            ],
            images: {
                main: {
                    url: build_hut_with_garden_5,
                    trim: {
                        left: 144,
                        top: 300,
                        width: 326,
                        height: 279
                    }
                },
                surface: {
                    url: build_hut_with_garden_5_surface,
                    trim: {
                        left: 67,
                        top: 300,
                        width: 397,
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
            cutoff: 560
        },
        hut_with_garden_6: {
            modulo: false,
            skewX: false,
            skewY: false,
            size: [
                3,
                3
            ],
            images: {
                surface: {
                    url: build_hut_with_garden_6_surface,
                    trim: {
                        left: 23,
                        top: 370,
                        width: 502,
                        height: 168
                    }
                },
                main: {
                    url: build_hut_with_garden_6,
                    trim: {
                        left: -32,
                        top: 68,
                        width: 576,
                        height: 487
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
            cutoff: 430
        },
        hut_with_garden_4: {
            modulo: false,
            skewX: false,
            skewY: false,
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
        hut_with_garden_3: {
            modulo: false,
            skewX: false,
            skewY: false,
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
            skewX: false,
            skewY: false,
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
        hut_with_garden_1: {
            modulo: false,
            skewX: false,
            skewY: false,
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
            skewX: false,
            skewY: false,
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
            skewX: false,
            skewY: false,
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
            skewX: false,
            skewY: false,
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
            skewX: false,
            skewY: false,
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
            skewX: false,
            skewY: false,
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
            skewX: false,
            skewY: false,
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
            skewX: false,
            skewY: false,
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
            skewX: false,
            skewY: false,
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

