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

import {Ghost} from 'grid/Ghost';








export class Grid extends PIXI.Container{
	constructor(){
		super();

		App.register(this);

		// BG
		this.background = this.addChild( new PIXI.Sprite(PIXI.Texture.WHITE) );
		this.background.anchor.set(0.5);
		this.background.scale.set(1000,1000);


		// ADD THE FACE OOF THE GRID
		this.face = this.addChild( new Face() );

		this.size = {
			reset:function(){
				this.minx =  Number.MAX_SAFE_INTEGER;
				this.maxx = -Number.MAX_SAFE_INTEGER;
				this.miny =  Number.MAX_SAFE_INTEGER;
				this.maxy = -Number.MAX_SAFE_INTEGER;
				return this;
			},
			get width(){  return (this.maxx - this.minx) + 1 },
			get height(){ return (this.maxy - this.miny) + 1 },
			add:function(x,y){
				this.minx = Math.min(x, this.minx );
				this.miny = Math.min(y, this.miny );
				this.maxx = Math.max(x, this.maxx );
				this.maxy = Math.max(y, this.maxy );
				return this;
			},
			update:function(){
				this.reset();
				var x,y;
				for( x in App.Grid.tiles ){
					for( y in App.Grid.tiles[x] ){
						this.add(x,y);
					}
				}
				return this;
			}
		}.reset();

		this.tiles = {};

		// HOLDER CLASS FOR THE MAP-DATA
		this.data = new Data();


		// PATHFINDER INSTANCE
		this.finder = new PF.AStarFinder({
			 allowDiagonal: false
		});

		this.stamp = this.addChild( new Stamp() );
		this.stamp.alpha = 0.5;

		this.ghost = this.addChild( new Ghost() );
		this.ghost.alpha = 0.5;

		// INTERACTION
		this.interactive = true;
		this.on('pointerdown', 	(e)=>{ this.pointer(e) } );
		this.on('pointermove', 	(e)=>{ this.pointer(e) } );
		this.on('pointerup',   	(e)=>{ this.pointer(e) } );
		this.on('pointertap',  	(e)=>{ this.pointer(e) } );
		this.on('pointercancel',(e)=>{ this.pointer(e) } );
		this.on('pointerout',  	(e)=>{ this.pointer(e) } );


			
	}

	// ADD TILE
	add(x,y){
		if( !this.tiles[x] ) this.tiles[x] = {};
		if( !this.tiles[x][y] ) this.tiles[x][y] = this.addChild( new Tile(x,y) );

		console.log('Grid.add', x, y);
		this.size.add(x,y);
		
		Transform.position( Transform.transform( this.tiles[x][y] ) );
		return this.tiles[x][y];
	}

	remove(x,y){
		if( !this.tiles[x] ) return false;
		if( !this.tiles[x][y] ) return false;

		this.tiles[x][y].destroy();
		delete this.tiles[x][y];

		// UPDATE GRIDSIZE
		this.size.update();

		return true;

	}
	
	// GET TILE
	getTile(c,isCoordinate=true, create = false){
		if( !c ) return undefined;
		if( !isCoordinate ) c = Transform.p2c(c.x-this.x,c.y-this.y);
		if( create && (!this.tiles[c.x] || !this.tiles[c.x][c.y]) ){
			// AUTOCREATE
			this.add(c.x, c.y);
		}
		if( !this.tiles[c.x] ) return undefined;
		return this.tiles[c.x][c.y];
	}

	// GET TILE ARRAY
	getTileArray(tile, width = 1, height = width, modulo = false){
		
		if( !tile ) return [];

		let cx = tile.cx,
			cy = tile.cy,
			a = [],x,y,t;

		if( modulo ){
			cx = Math.round(cx / width) * width;
			cy = Math.round(cy / height) * height;
		}

		var left = cx - Math.ceil(width*0.5)  + 1,
			top  = cy - Math.ceil(height*0.5) + 1;
		
		if( left < this.size.minx ||
			left + width > this.size.maxx + 1 ||
			top < this.size.miny ||
			top + height > this.size.maxy + 1 ){
			
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
				t = this.getTile({x:x,y:y}, true)
				if( t ) a.push(t);
			}
		}

		if( a.length !== width * height ) return [];
		return a;
	}


	get mode(){
		return App.Interface.mode();
	}


	updateStamp(interfaceSelection){
		if( this._interfaceSelection !== interfaceSelection ){

			// CACHE
			this._interfaceSelection = interfaceSelection;

			// PASS TO STAMP
			this.stamp.textureData = interfaceSelection;

			// APPLY TO GHOST TILES
			this.ghost.textureDataId = interfaceSelection.id;
				
		}

	}

	


	pointer( e){


		switch(e.type){

			case  'pointerdown':
				this.__pd = true;
				this.__ps = e.data.getLocalPosition(this.parent, this.__ps);
				this.__pp = this.__ps.clone();

				this.hover();

				if( this.ghost.enabled ){
					this.ghost.confirm();
				}

				break;
			case 'pointermove':
				this.__pc =  e.data.getLocalPosition(this.parent, this.__pc);
				if( this.mode === 'drag' && this.__pd ){
					this.drag(this.__pc.x - this.__pp.x, this.__pc.y - this.__pp.y);
				}else{
					this.hover();
				}

				this.__pp = this.__pc.clone()
				break;
			case 'pointerup':
			case 'pointercancel':
			case 'pointerout':
				delete this.__ps;
				delete this.__pc;
				delete this.__pp;
				this.__pd = false;

				if( e.type === 'pointerup')	this.confirm();

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
		if( this._hoverExtended ) this._hoverExtended.forEach( (tile)=>{ tile.hover = false;} );
		
		// CLEAR
		this._hover = [];
		this._hoverExtended = [];

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

				if( this.mode === 'destroy-surface'){
					this._hover.forEach( (tile) => {
						tile.content.select('road|build').forEach( (associatedTile) => {
							if( this._hover.indexOf(associatedTile) === -1 && this._hoverExtended.indexOf(associatedTile) === -1 ){
								this._hoverExtended.push( associatedTile );
							}
						})
					});
				}

			}

		}else{
			this._hover = this.getTileArray( 
				this.getTile(this.__pc, false),
				interfaceSelection.size[0] ,interfaceSelection.size[1], interfaceSelection.modulo
			);
		}


		// POSITION THE STAMP-TOOL
		this.stamp.selection = this._hover;

		// HANDLING CREATION OF NEW TILES
		this.ghost.enabled = (this.mode === 'surface' && !this._hover.length );
		if( this.ghost.enabled ){
			this.ghost.coordinates( Transform.p2c(this.__pc.x-this.x, this.__pc.y-this.y) );
		} 
		
		// AUTO-CONFIRM
		if( this.__pd && (
			(this.mode === 'destroy-surface') ||				// AUTO-CONFIRM ROAD RESTRUCTION
			(this.mode === 'destroy-road') ||					// AUTO-CONFIRM ROAD RESTRUCTION
			(this.mode === 'surface' && this._hover.length ) ||	// AUTO-CONFIRM SURFACE PLACEMENT
			(this.ghost.enabled)								// AUTO-CONFIRM TILE-CREATION
		)){
			if( this.ghost.enabled ){
				this.ghost.confirm();
			}else{
				this.confirm();
			}
			return;
		}


		// SHOW HOVERING
		this._hover.forEach( (tile)=>{ 
			tile.hover = true;
		});
		this._hoverExtended.forEach( (tile)=>{ 
			tile.hover = true;
		});
		

		
		

	}

	

	confirm(){



		if( this._hover.length === 0 ) return;

		if( this.mode.indexOf('destroy') !== -1 ){

			if( this.mode === 'destroy-surface' ){
				this.data.destroy(this._hover);
				this._hover = [];
			}else{
				this.data.remove( this.mode.split('-')[1], this._hover );
			}

		}else if( this.stamp.textureData ){
			var _added = this.data.add( this.stamp.textureData.id, this.stamp.selection );
		}

		if( this._selected ) this._selected.forEach( (tile)=>{ tile.selected = false;} );
	}

	path(from, to){

		if( !from || !to ) return [];
		
		console.log(from.toString() , to.toString(), this.size );

		
		// CREATE A PATHFINDER GRID
		let m = new PF.Grid(this.size.width, this.size.height),
			x,y, tile,bool;

		// ANALYSE SURFACE
		for(y=0;y<m.height;y++){
			for(x=0;x<m.width;x++){
				tile = this.getTile({x:x+this.size.minx,y:y+this.size.miny}, true);
				bool = tile ? true : false;
				m.setWalkableAt(x,y,bool);
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