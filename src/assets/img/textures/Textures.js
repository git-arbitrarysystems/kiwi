import grass from './surface_grass.png'
import water from './surface_water.png'
import dirt from './surface_dirt.png'
import stone from './road_stone.png'
import castleAlt from './build_castleAlt.png'
import castle from './build_castle.png'


const Textures = {
    surface: {
        grass: {
            size: [
                3,
                3
            ],
            modulo: true,
            url: grass
        },
        water: {
            size: [
                3,
                3
            ],
            modulo: true,
            url: water
        },
        dirt: {
            size: [
                3,
                3
            ],
            modulo: true,
            url: dirt
        }
    },
    road: {
        stone: {
            size: [
                1,
                1
            ],
            url: stone
        }
    },
    build: {
        castleAlt: {
            size: [
                4,
                2
            ],
            url: castleAlt
        },
        castle: {
            size: [
                6,
                6
            ],
            url: castle
        }
    }
};

export {Textures}