import * as PIXI from 'pixi.js';
import * as PF from 'pathfinding';
import {ResizeHandler} from 'ResizeHandler';
import {Tile} from 'grid/Tile';
import {Stamp} from 'grid/Stamp';
import {Face} from 'grid/Face';
import {Transform} from 'grid/Transform';
import {Data} from 'grid/Data';
import {Road} from 'grid/Road';
import {App} from 'App';








export class Grid extends PIXI.Container{
	constructor(){
		super();

		App.register(this);


		// ADD THE FACE OOF THE GRID
		this.face = this.addChild( new Face() );

		// HOLDER CLASS FOR THE MAP-DATA
		this.data = new Data({});

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

		this.stamp = this.addChild( new Stamp() );
		this.stamp.alpha = 0.5;

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

		Transform.position( Transform.transform( this.tiles[x][y] ) );
		return this.tiles[x][y];
	}
	
	// GET TILE
	getTile(c,isCoordinate=true){
		if( !c ) return undefined;
		if( !isCoordinate ) c = Transform.p2c(c.x-this.x,c.y-this.y);
		if( !this.tiles[c.x] ) return undefined;
		return this.tiles[c.x][c.y];
	}

	// GET TILE ARRAY
	getTileArray(tile, width = 1, height = width, modulo = false){
		
		if( !tile ) return [];

		let cx = tile.cx,
			cy = tile.cy,
			a = [],x,y;

		if( modulo ){
			cx = Math.round(cx / width) * width;
			cy = Math.round(cy / height) * height;
		}

		var left = cx - Math.ceil(width*0.5)  + 1,
			top  = cy - Math.ceil(height*0.5) + 1;
		
		if( left < this.size.minx ||
			left + width >= this.size.maxx ||
			top < this.size.miny ||
			top + height >= this.size.maxy ){
			
			if(modulo){
				// iNVALID
				return [];
			}else{
				// LIMIT
				left = Math.min( Math.max( left, this.size.minx ), this.size.maxx - width  + 1),
				top  = Math.min( Math.max( top , this.size.miny ), this.size.maxy - height + 1);
			}
		}

		for(x=left;x<left+width;x++){
			for(y=top;y<top+height;y++){
				a.push( this.getTile({x:x,y:y}, true) );
			}
		}

		a.forEach( (v,i,a) => { if( !v ) a.splice(i,1); });


		return a;
	}


	get mode(){
		return App.Interface.mode();
	}

	


	pointer( e){

		switch(e.type){

			case  'pointerdown':
				this.__pd = true;
				this.__ps = e.data.getLocalPosition(this.parent, this.__ps) //{x:e.data.global.x, y:e.data.global.y};
				this.__pp = this.__ps.clone() //{x:e.data.global.x, y:e.data.global.y};
				break;
			case 'pointermove':
				this.__pc =  e.data.getLocalPosition(this.parent, this.__pc);//{x:e.data.global.x, y:e.data.global.y};


				
				if( this.mode === 'drag' && this.__pd ){
					this.drag(this.__pc.x - this.__pp.x, this.__pc.y - this.__pp.y);
				}else{
					this.hover();
				}

				this.__pp = this.__pc.clone()//{x:e.data.global.x, y:e.data.global.y};
				break;
			case 'pointerup':
			case 'mouseup':
			case 'touchend':
				
				delete this.__ps;
				delete this.__pc;
				delete this.__pp;
				this.__pd = false;

				this.confirm();

				break;
			case 'pointertap':

				break;

		}
	}

	drag(dx, dy){
		this.x += dx;
		this.y += dy;
	}
	hover(){
		
		// UNHOVER
		if( this._hover ) this._hover.forEach( (tile)=>{ tile.hover = false;} );

		let interfaceSelection = Object.assign({
			size:[1,1],
			modulo:false
		}, App.Interface.selected() );

		
		// GET SELECTION
		if( this.mode === 'road' && this.__ps ){
			this._hover = this.path( this.getTile(this.__ps,false), this.getTile(this.__pc,false) );
		}else if( this.mode.indexOf('destroy') !== -1 ){
			
			// DESTROY MODE HANDLING
			var what = this.mode.split('-')[1],
				tile = this.getTile(this.__pc, false);

			if( tile && tile.content.contains(what) ){
				this._hover = tile.content.select(what);
			}else{
				this._hover = [];
			}

		}else{
			this._hover = this.getTileArray( 
				this.getTile(this.__pc, false),
				interfaceSelection.size[0] ,interfaceSelection.size[1], interfaceSelection.modulo
			);
		}


		// POSITION THE STAMP-TOOL
		this.stamp.selection = this._hover;
		
		if( 
			(this.mode === 'destroy-road' && this.__pd) || // AUTO CONFIRM ROAD RESTRUCTION
			(this.mode === 'surface' && this.__pd )
		){
			this.confirm();
			return;
		}


		// SHOW HOVERING
		this._hover.forEach( (tile)=>{ 
			tile.hover = true;
		});

		
	

	}

	

	confirm(){

		if( this._hover.length === 0 ) return;

		if( this.mode.indexOf('destroy') !== -1 ){
			this.data.remove( this.mode.split('-')[1], this._hover );
		}else if( this.stamp.textureData ){
			var _added = this.data.add( this.stamp.textureData.id, this.stamp.selection );
		}

		if( this._selected ) this._selected.forEach( (tile)=>{ tile.selected = false;} );
	}

	path(from, to){

		if( !from || !to ) return [];
		

		
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

		return result;

	}
	
}


import {HotModule} from 'HotModule'
HotModule(module, Grid);