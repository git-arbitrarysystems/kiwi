import grass from './surface_grass.png'
import water from './surface_water.png'
import dirt from './surface_dirt.png'
import stone from './road_stone.png'
import castle from './build_castle.png'
import castleAlt from './build_castleAlt.png'
import s5x2 from './build_s5x2.png'
import s4x2 from './build_s4x2.png'
import s2x2 from './build_s2x2.png'
import s1x1 from './build_s1x1.png'


const Textures = {
    surface: {
        grass: {
            modulo: true,
            skew: true,
            size: [
                3,
                3
            ],
            url: grass,
            orig: {
                left: 0,
                top: 0,
                width: 512,
                height: 512
            },
            trim: {
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
            url: water,
            orig: {
                left: 0,
                top: 0,
                width: 512,
                height: 512
            },
            trim: {
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
            url: dirt,
            orig: {
                left: 0,
                top: 0,
                width: 512,
                height: 512
            },
            trim: {
                left: 0,
                top: 0,
                width: 512,
                height: 512
            }
        }
    },
    road: {
        stone: {
            modulo: false,
            skew: true,
            size: [
                1,
                1
            ],
            url: stone,
            orig: {
                left: 0,
                top: 0,
                width: 128,
                height: 128
            },
            trim: {
                left: 0,
                top: 0,
                width: 128,
                height: 128
            }
        }
    },
    build: {
        castle: {
            modulo: false,
            skew: false,
            size: [
                6,
                6
            ],
            url: castle,
            orig: {
                left: 0,
                top: 0,
                width: 512,
                height: 613
            },
            trim: {
                left: 65,
                top: 0,
                width: 444,
                height: 524
            }
        },
        castleAlt: {
            modulo: false,
            skew: false,
            size: [
                4,
                2
            ],
            url: castleAlt,
            orig: {
                left: 0,
                top: 0,
                width: 512,
                height: 613
            },
            trim: {
                left: 0,
                top: 186,
                width: 348,
                height: 418
            }
        },
        s5x2: {
            modulo: false,
            skew: false,
            size: [
                5,
                2
            ],
            url: s5x2,
            orig: {
                left: 0,
                top: 0,
                width: 512,
                height: 613
            },
            trim: {
                left: 0,
                top: 271,
                width: 512,
                height: 342
            }
        },
        s4x2: {
            modulo: false,
            skew: false,
            size: [
                4,
                2
            ],
            url: s4x2,
            orig: {
                left: 0,
                top: 0,
                width: 512,
                height: 613
            },
            trim: {
                left: 0,
                top: 271,
                width: 512,
                height: 342
            }
        },
        s2x2: {
            modulo: false,
            skew: false,
            size: [
                2,
                2
            ],
            url: s2x2,
            orig: {
                left: 0,
                top: 0,
                width: 512,
                height: 613
            },
            trim: {
                left: 0,
                top: 270,
                width: 513,
                height: 343
            }
        },
        s1x1: {
            modulo: false,
            skew: false,
            size: [
                1,
                1
            ],
            url: s1x1,
            orig: {
                left: 0,
                top: 0,
                width: 512,
                height: 613
            },
            trim: {
                left: 0,
                top: 271,
                width: 512,
                height: 342
            }
        }
    }
};

export {Textures}