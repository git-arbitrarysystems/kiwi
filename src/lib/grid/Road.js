import * as PIXI from 'pixi.js';

export class Road{
	constructor(sprite){
		this.sprite = sprite;
	}
	clear(){
		if( this.sprite.mask ){
			this.sprite.mask.clear();
			if( this.sprite.mask.parent ){
				this.sprite.removeChild(this.sprite.mask);
			}
			this.sprite.mask = null;
		}
	}
	connect(top = false, right = false, bottom = false, left = false){
		let radius = this.sprite.texture.width * 0.33;

		if( !this.sprite.mask ){
			this.sprite.mask = new PIXI.Graphics();
		}
		if( !this.sprite.mask.parent ){
			this.sprite.addChild( this.sprite.mask );
		}

		this.sprite.mask.clear();
		this.sprite.mask.beginFill(0xffff00,1);
		this.sprite.mask.drawCircle(0,0, radius);
		if( top 	) this.sprite.mask.drawRect(-radius,-radius*2,radius*2,radius*2);
		if( right 	) this.sprite.mask.drawRect(0,-radius,radius*2,radius*2);
		if( bottom 	) this.sprite.mask.drawRect(-radius,0,radius*2,radius*2);
		if( left 	) this.sprite.mask.drawRect(-radius*2,-radius,radius*2,radius*2);
		this.sprite.mask.endFill();
	}
	static fromSprite(sprite){
		sprite.road = new Road(sprite);
		return sprite;
	}
}


import {HotModule} from 'HotModule.js'
HotModule(module, Road );