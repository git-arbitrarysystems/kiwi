import * as PIXI from 'pixi.js';
import * as PF from 'pathfinding';
import {ResizeHandler} from 'ResizeHandler';
import {Tile} from 'grid/Tile';
import {App} from 'App';

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

		App.register(this);

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
	}

	// ADD TILE
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
	
	// GET TILE
	getTile(c,isCoordinate=true){
		if( !isCoordinate ) c = tools.p2c(c.x-this.x,c.y-this.y);
		if( !this.tiles[c.x] ) return undefined;
		return this.tiles[c.x][c.y];
	}

	// GET TILE ARRAY
	getTileArray(tile, width = 1, height = width){
		
		if( !tile ) return [];
		
		let cx = Math.min( Math.max( tile.cx - Math.ceil(width*0.5)  + 1, this.size.minx ), this.size.maxx - width  + 1),
			cy = Math.min( Math.max( tile.cy - Math.ceil(height*0.5) + 1, this.size.miny ), this.size.maxy - height + 1),
			a = [],x,y;
		for(x=cx;x<cx+width;x++){
			for(y=cy;y<cy+height;y++){
				a.push( this.getTile({x:x,y:y}, true) );
			}
		}
		return a;
	}


	get mode(){
		return App.Interface.mode();
	}

	pointer( e){

		if( e.type === 'pointerdown'){
			this.__pd = true;
			this.__ps = {x:e.data.global.x, y:e.data.global.y};
			this.__pp = {x:e.data.global.x, y:e.data.global.y};
		}else if( e.type === 'pointermove'){
			
			this.__pc = {x:e.data.global.x, y:e.data.global.y};
			

			if( this.mode === 'drag' && this.__pd ){
				this.drag(this.__pc.x - this.__pp.x, this.__pc.y - this.__pp.y);
			}else if( this.mode === 'road' && this.__pd ){
				this.path( this.getTile(this.__ps,false), this.getTile(this.__pc,false) );
			}else{
				this.hover();
			}



			this.__pp = {x:e.data.global.x, y:e.data.global.y};


		}else if( e.type ===  'pointerup'){
			
			delete this.__ps;
			delete this.__pc;
			delete this.__pp;
			this.__pd = false;
		
		}else if( e.type ===  'pointertap'){
			
			/*if( this.mode === 'drag' ){
				this.selected = this.getTileFromEvent(e);
			}*/

		}
	}

	drag(dx, dy){
		this.x += dx;
		this.y += dy;
	}

	hover(width = 1, height = width){
		if( this._hover ) this._hover.forEach( (tile)=>{ if(tile) tile.hover = false;} );
		this._hover = this.getTileArray( this.getTile(this.__pc, false) ,width ,height );
		this._hover.forEach( (tile)=>{ if(tile) tile.hover = true;} );
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
			result[i] = this.getTile( {x:result[i][0]+this.size.minx, y:result[i][1]+this.size.miny} );
		}

		// SET SELECTION
		this.selected = result;

	}
	
}


import {HotModule} from 'HotModule'
HotModule(module, Grid);