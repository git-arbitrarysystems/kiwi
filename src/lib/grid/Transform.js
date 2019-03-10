
import {Tile} from 'grid/Tile';
import {App} from 'App';


const Transform = {
	
	// COORDINATES TO POINT
	c2p:function(cx,cy){
		return {
			x:(cx + cy ) * Tile.halfWidth,
			y:(cy - cx ) * Tile.halfHeight
		}
	},
	
	// POINT TO COORDINATES
	p2c:function(x,y){

		x /= App.Grid.scale.x;
		y /= App.Grid.scale.y;

		var cx = ( x/Tile.halfWidth - y/Tile.halfHeight ) / 2,
			cy = y/Tile.halfHeight + cx;
		return {
			x:Math.round(cx),
			y:Math.round(cy)
		}
	},
	
	// SET POSITION BASED ON COORDINATES
	position: function(sprite){
		let p = Transform.c2p(sprite.cx, sprite.cy);
		sprite.x = p.x;
		sprite.y = p.y;
	},

	// UPDATE TRANSFORMATION
	transform: function(sprite, span = 1, skewed = true, overflow = 1.01){
		sprite.anchor.set(0.5);
		sprite.pivot.set(0);
		if( skewed ){
			sprite.scale.set( ( Tile.diameter * 0.5 * span / sprite.texture.width ) * overflow );
			sprite.skew.set( Tile.skewX, Tile.skewY );
		}else{
			
			var spanWidth = 1;
			if( span > 1 ) spanWidth = 1 + span*0.5;
			sprite.scale.set( ( ( Tile.width * spanWidth) / sprite.texture.width ) * overflow );
			sprite.skew.set(0,0);
		}
		return sprite;
	}
};



export {Transform}



import {HotModule} from 'HotModule'
HotModule(module, Transform);