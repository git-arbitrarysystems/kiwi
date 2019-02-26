import * as PIXI from 'pixi.js';

import {ResizeHandler} from 'ResizeHandler';
import {Tile} from 'Tile';


const options = (function(){
	const options = {};
	options.tileWidth = 64;
	options.tileRatio = 0.666667;
	options.tileHeight = options.tileWidth * options.tileRatio;
	options.tileDiameter = Math.sqrt( options.tileHeight*options.tileHeight+options.tileWidth*options.tileWidth);
	options.halfTileWidth = options.tileWidth * 0.5;
	options.halfTileHeight = options.tileHeight * 0.5;
	options.tileSkewX = Math.atan2( options.tileWidth, options.tileHeight);
	options.tileSkewY = Math.atan2( -options.tileHeight, options.tileWidth);
	return options;
})();



const tools = (function(){
	const tools = {};

	// COORDINATES TO POINT
	tools.c2p = function(cx,cy){
		return {
			x:(cx + cy ) * options.halfTileWidth,
			y:(cy - cx ) * options.halfTileHeight
		}
	}

	// POINT TO COORDINATES
	tools.p2c = function(x,y){
		var cx = ( x/options.halfTileWidth - y/options.halfTileHeight ) / 2,
			cy = y/options.halfTileHeight + cx;
		return {
			x:Math.round(cx),
			y:Math.round(cy)
		}
	}

	tools.position = function(sprite){
		let p = tools.c2p(sprite.cx, sprite.cy);
		sprite.x = p.x;
		sprite.y = p.y;
	}

	tools.transform = function(sprite, span = 1){
		sprite.anchor.set(0.5);
		sprite.scale.set( ( options.tileDiameter * 0.5 * span / sprite.texture.width ) * 1.01 );
		sprite.skew.set(options.tileSkewX, options.tileSkewY);
		return sprite;
	}

	return tools;



})()


export class Grid extends PIXI.Container{
	constructor(){
		super();

		this.tiles = {};


		// TEMP
		var x,y, d=15, tile;
		for(x=-d;x<=d;x++){
			for(y=-d;y<=d;y++){
				this.add(x,y);
			}
		}


		// INTERACTION
		this.interactive = true;
		
		this.on('pointerdown', (e)=>{
			this._dragging = {x:e.data.global.x, y:e.data.global.y};
		});

		this.on('pointerup', (e)=>{
			this._dragging = false;
		});

		this.on('pointermove', (e) => {
			if( this._dragging ){
				this.x -= this._dragging.x - e.data.global.x;
				this.y -= this._dragging.y - e.data.global.y;
				this._dragging = {x:e.data.global.x, y:e.data.global.y};
			}
			let tile = this.getTileFromEvent(e);
			if( this.previousHoverTile ) this.previousHoverTile.hover = false;
			if( tile ){
				this.previousHoverTile = tile;
				tile.hover = true;
			}
		});

		this.on('pointertap', (e) => {
			let tile = this.getTileFromEvent(e);
			if( this.previousSelectTile ) this.previousSelectTile.selected = false;
			if( tile ){
				this.previousSelectTile = tile;
				tile.selected = true;
			}
		});


		




		ResizeHandler.add( (dimensions) => {

		})
		
	}
	add(x,y){
		if( !this.tiles[x] ) this.tiles[x] = {};
		if( !this.tiles[x][y] ) this.tiles[x][y] = this.addChild( new Tile(x,y) );

		tools.position( tools.transform( this.tiles[x][y] ) );
		return this.tiles[x][y];
	}
	get(x,y){
		if( !this.tiles[x] ) return undefined;
		return this.tiles[x][y];
	}
	getTileFromEvent(e){
		let p = {x:e.data.global.x - this.x, y:e.data.global.y - this.y},
			c = tools.p2c(p.x,p.y);
		return this.get(c.x, c.y);
	}
}