import * as PIXI from 'pixi.js';
import {TextureData} from 'interface/Interface';
import {Stamp} from 'grid/Stamp';
import {Data} from 'grid/Data';
import {App} from 'App';

export class Face extends PIXI.Container{
	constructor(){
		super();

		

		this.renderTypes = ['surface', 'road'];
		this.renderTypes.forEach( (type, index) => {
			this[type] = this.addChild( new PIXI.Container() );
			this[type].sortableChildren = true;
			this[type+'Sprite'] = this.addChild( new PIXI.Sprite() );
			this[type+'Sprite'].visible = false;
		});

		this.sortableChildren = true;

		//this.tint = 0xccddee;

	

	}

	get tint(){ return this._tint || 0xffffff; };
	set tint(tint){
		this._tint = tint;
		this.children.forEach( (child) => {
			child.tint = tint;
		})

	}

	add( sprite, type){
		
		// SET APPROPRIATE Z-INDEX
		sprite.zIndex = 100000 + sprite.y;
		
		if( sprite.cutoff ){
			//console.log('Face.add(cutoff)', sprite.zIndex, sprite.cutoff);
			sprite.zIndex -= ( sprite.anchor.y * sprite.texture.height - sprite.cutoff ) * sprite.scale.y;
			//console.log('Face.add(cutoff)', sprite.zIndex, sprite.cutoff);
		}


		/*if( !sprite.anchorChild ){
			sprite.anchorChild = sprite.addChild( new PIXI.Graphics() )
			sprite.anchorChild.beginFill(0xff0000,0.5);
			sprite.anchorChild.drawRect(sprite.texture.width * sprite.anchor.x * -1,sprite.texture.height * sprite.anchor.y * -1,sprite.texture.width,sprite.texture.height * (1-sprite.anchor.y))
			sprite.anchorChild.endFill();
		}*/

		//console.log('Face.add', sprite.texture.textureCacheIds[0], sprite.zIndex);

		if( this[type] ){
			this[type].addChild(sprite);
			this[type].visible = true;
			this[type+'Sprite'].visible = false;
			this.renderTexture(type);
		}else{
			this.addChild(sprite);
			sprite.tint = this.tint;
			if( sprite.surfaceSprite ){
				this.add( sprite.surfaceSprite, 'surface' )
			}
			//this.children.sort( (a,b) => { return a.zIndex - b.zIndex })
		}


		

	}

	remove( sprite, type ){

		if( sprite.surfaceSprite ){
			sprite.surfaceSprite.destroy();
			type = 'surface'
		}
		sprite.destroy();
		
		if( this[type] ){
			this[type].visible = true;
			this[type+'Sprite'].visible = false;
			this.renderTexture(type);
		}
		
		
		
		
	}


	renderTexture(type, delay = true){

		if( delay ){
			var self = this;
			clearTimeout( this[type + 'RenderDelay'] );
			this[type + 'RenderDelay'] = setTimeout( function(){
				self.renderTexture(type, false);
			}, 1000);
			return;
		}
		
		
		var bounds = this[type].getLocalBounds(),
			w = Math.ceil(bounds.width),
			h = Math.ceil(bounds.height),
			texture = PIXI.RenderTexture.create(w,h);

		console.log('Face.renderTexture', type, w , 'x' , h);

		this[type].x = -bounds.left;
		this[type].y = -bounds.top;

		App.App.renderer.render(this[type], texture);
		this[type+'Sprite'].texture = texture;
		this[type+'Sprite'].x = bounds.left;
		this[type+'Sprite'].y = bounds.top;
		this[type+'Sprite'].visible = true;

		this[type].x = 0;
		this[type].y = 0;
		this[type].visible = false;


	}

	

}


import {HotModule} from 'HotModule'
HotModule(module, Face);