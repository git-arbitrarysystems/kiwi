import * as PIXI from 'pixi.js';
import * as PF from 'pathfinding';
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

		this.size = {minx:0,miny:0,maxx:0, maxy:0,width:0,height:0};
		this.tiles = {};

		// TEMP
		var x,y, d=15, tile;
		for(x=-d;x<=d;x++){
			for(y=-d;y<=d;y++){
				this.add(x,y);
			}
		}

		// PATHFINDER INSTANCE
		this.finder = new PF.AStarFinder({
			 allowDiagonal: false
		});


		// INTERACTION
		this.interactive = true;
		this.on('pointerdown', (e)=>{ this.pointer(e) } );
		this.on('pointermove', (e)=>{ this.pointer(e) } );
		this.on('pointerup',   (e)=>{ this.pointer(e) } );
		this.on('pointertap',  (e)=>{ this.pointer(e) } );


		
		


		

		




		ResizeHandler.add( (dimensions) => {

		})
		
	}
	get mode(){
		// MODES: ['path', 'drag']
		return 'path';
	}
	pointer( e){

		if( e.type === 'pointerdown'){
			
			if( this.mode === 'drag' ){
				this._dragStart = {x:e.data.global.x, y:e.data.global.y};
			}else if( this.mode === 'path' ){
				this._pathStart = this.getTileFromEvent(e);
			}

		}else if( e.type === 'pointermove'){

			if( this._dragStart ){
				this.x -= this._dragStart.x - e.data.global.x;
				this.y -= this._dragStart.y - e.data.global.y;
				this._dragStart = {x:e.data.global.x, y:e.data.global.y};
			}

			let tile = this.getTileFromEvent(e);
			if( tile !== this._previousHoverTile ){

				if( this._previousHoverTile ) this._previousHoverTile.hover = false;
				if( tile ){
					this._previousHoverTile = tile;
					tile.hover = true;
				}

				if( this.mode === 'path' && this._pathStart ){
					this.path(this._pathStart, tile);
				}
			}

		}else if( e.type ===  'pointerup'){
			
			this._dragStart = false;
			this._pathStart = false;
		
		}else if( e.type ===  'pointertap'){
			
			if( this.mode === 'drag' ){
				this.selected = this.getTileFromEvent(e);
			}

		}
	}
	set selected(array){

		// DESELECT ALL
		if( this._selected ){
			for(var i=0;i<this._selected.length;i++) this._selected[i].selected = false;
		}

		//
		if( !array ) return;
		if( !Array.isArray(array) ) array = [array];

		this._selected = array;
		if( this._selected ){
			for(var i=0;i<this._selected.length;i++) this._selected[i].selected = true;
		}
	}
	add(x,y){
		if( !this.tiles[x] ) this.tiles[x] = {};
		if( !this.tiles[x][y] ) this.tiles[x][y] = this.addChild( new Tile(x,y) );

		this.size.minx = Math.min(x, this.size.minx );
		this.size.miny = Math.min(y, this.size.miny );
		this.size.maxx = Math.max(x, this.size.maxx );
		this.size.maxy = Math.max(y, this.size.maxy );
		this.size.width = this.size.maxx - this.size.minx;
		this.size.height = this.size.maxy - this.size.miny;

		tools.position( tools.transform( this.tiles[x][y] ) );
		return this.tiles[x][y];
	}
	get(x,y){
		if( !this.tiles[x] ) return undefined;
		return this.tiles[x][y];
	}
	path(from, to){
		
		// CREATE A PATHFINDER GRID
		let m = new PF.Grid(this.size.width+1, this.size.height+1);
		
		// ANALYSE SURFACE
		var x,y;
		for(x in this.tiles ){
			for(y in this.tiles ){
				m.setWalkableAt(x-this.size.miny, y-this.size.miny, true);
			}
		}

		// GET RESULTS
		let result = this.finder.findPath(from.cx-this.size.minx, from.cy-this.size.miny, to.cx-this.size.minx, to.cy-this.size.miny, m );

		// CONVERT RESULTS TO TILE-ARRAY
		let i, n=result.length;
		for(i=0;i<n;i++){
			result[i] = this.get(result[i][0]+this.size.minx, result[i][1]+this.size.miny);
		}

		// SET SELECTION
		this.selected = result;

	}
	getTileFromEvent(e){
		let p = {x:e.data.global.x - this.x, y:e.data.global.y - this.y},
			c = tools.p2c(p.x,p.y);
		return this.get(c.x, c.y);
	}
}


import {HotModule} from '../../HotModule.js'
HotModule(module, Grid);