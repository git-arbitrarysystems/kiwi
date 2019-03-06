import * as PIXI from 'pixi.js';

export class Road{
	
	constructor(sprite){
		this.sprite = sprite;
		this.enabled = true;
	}

	get enabled(){ return this._enabled }
	set enabled(bool){
		if( bool !== this.enabled ){
			
			if( !bool ){
				// CLEAR ALL MASKING
				this.clear();
			}else{
				// CONNECTION CACHE
				this.cc = {};
				if( !this.sprite.mask )	this.sprite.mask = new PIXI.Graphics();
				if( !this.sprite.mask.parent ) this.sprite.addChild( this.sprite.mask );
			}
		}
	}
	
	clear(){
		if( this.sprite.mask ){
			this.sprite.mask.destroy();
			this.sprite.mask = null;
		}
	}

	updateConnections(index, selection){
		var current = selection[index],
			prev = selection[index-1],
			next = selection[index+1];

		this.mask({
			top:(prev && prev.cy+1 === current.cy ) || (next && next.cy+1 === current.cy ),
			right:(prev && prev.cx-1 === current.cx ) || (next && next.cx-1 === current.cx ),
			bottom:(prev && prev.cy-1 === current.cy ) || (next && next.cy-1 === current.cy ),
			left:(prev && prev.cx+1 === current.cx ) || (next && next.cx+1 === current.cx )
		});
	}
	
	mask(sides){

		var requiresUpdate = (	sides.top 		!== this.cc.top || 
								sides.right 	!== this.cc.right || 
								sides.bottom 	!== this.cc.bottom ||
								sides.left		!== this.cc.left );
		if( requiresUpdate ){
			// CACHE
			this.cc = sides;

			let radius = this.sprite.texture.width * 0.33;

			// DRAW
			this.sprite.mask.clear();
			this.sprite.mask.beginFill(0xffff00,1);
			this.sprite.mask.drawCircle(0,0, radius);
			if( this.cc.top 	) this.sprite.mask.drawRect(-radius,-radius*2,radius*2,radius*2);
			if( this.cc.right 	) this.sprite.mask.drawRect(0,-radius,radius*2,radius*2);
			if( this.cc.bottom 	) this.sprite.mask.drawRect(-radius,0,radius*2,radius*2);
			if( this.cc.left 	) this.sprite.mask.drawRect(-radius*2,-radius,radius*2,radius*2);
			this.sprite.mask.endFill();

		}
	}
	
	static mixin(sprite){
		sprite.road = new Road(sprite);
		return sprite;
	}
}


import {HotModule} from 'HotModule.js'
HotModule(module, Road );