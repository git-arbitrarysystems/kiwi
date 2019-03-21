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

		this.g = this.addChild( new PIXI.Graphics() );
		this.g.zIndex = 10000000000;

		this.sortableChildren = true;
	}

	

	add( sprite, type, addedZIndex = 0){

		//console.log('add', type);

		if( !sprite.texture.valid ){
			sprite.texture.on('update', (e) => { this.add(sprite, type, addedZIndex) })

			return;
		}

		
		// SET APPROPRIATE Z-INDEX
		sprite.zIndex = 100000 + sprite.y + ((1-sprite.anchor.y) * sprite.texture.orig.height * sprite.scale.y ) + addedZIndex;
		
		if( sprite.cutoff ){
			//console.log('Face.add', sprite.texture.textureCacheIds[0],sprite.cutoff, sprite.texture.height, sprite.texture.valid);
			sprite.zIndex -= (sprite.texture.orig.height - sprite.cutoff ) * sprite.scale.y;
			//console.log('Face.add(cutoff)', sprite.zIndex, sprite.cutoff);
		}

		/*if( !sprite.interactive  && type === 'build'){
			sprite.interactive = true;
			var self = this;
			sprite.on('pointerover', function(e){


	
					var w = sprite.texture.trim.width * sprite.scale.x,
						h = sprite.texture.trim.height * sprite.scale.y,
						x = sprite.x + sprite.texture.trim.x * sprite.scale.x,
						y = sprite.y + sprite.texture.trim.y * sprite.scale.y
					self.g.lineStyle(3, Math.floor( 0xffffff * Math.random() ) );
					//this.g.drawRect(x-w*0.5,y-h,w,h);
					var a = {x:sprite.x, y:sprite.y},
						b = {x:sprite.x, y:sprite.y - (sprite.texture.orig.height-sprite.cutoff) * sprite.scale.y },
						d = 3;
					self.g.moveTo(a.x-d, a.y+d)
					self.g.lineTo(a.x+d, a.y-d)
					self.g.moveTo(a.x-d, a.y-d)
					self.g.lineTo(a.x+d, a.y+d)

					self.g.lineStyle(3, 0xff0000);
					self.g.moveTo(b.x-d, b.y+d)
					self.g.lineTo(b.x+d, b.y-d)
					self.g.moveTo(b.x-d, b.y-d)
					self.g.lineTo(b.x+d, b.y+d)

					self.g.lineStyle(1);
					self.g.moveTo(a.x, a.y);
					self.g.lineTo(b.x, b.y);



			}, sprite);
			sprite.on('pointerout' , (e) => {  self.g.clear();})
		}*/
		


		if( this[type] ){
			this[type].addChild(sprite);
			this[type].visible = true;
			this[type+'Sprite'].visible = false;
			
			if( !sprite.texture.valid ){
				sprite.texture.on('update', () => {
					this.renderTexture(type);
				})
			}else{
				this.renderTexture(type);
			}
			



		}else{
			this.addChild(sprite);


			 /*['surfaceSprite', 'topConnector', 'bottomConnector'].forEach( (id) => {
			 	if( sprite[id] ){

			 		console.log('Face.add(derivate:'+id+')');

			 		switch( id ){
			 			case 'surfaceSprite':
			 				this.add( sprite[id], 'surface', 100000 )
			 				break;
			 			case 'topConnector':
			 				this.add( sprite[id], 'fence', -0.1 )
			 				break;
			 			case 'bottomConnector':
			 				this.add( sprite[id], 'fence',  0.1 )
			 				break;
			 		}


			 		

			 	}
			 })*/

			
		}
 	
 		if( sprite.derivates ){
 			var s,d;
			//console.log('Face.add.derivate', sprite.derivates);
			for( s in sprite.derivates ){
				d = sprite.derivates[s];

				this.add( d.sprite, d.type || '', d.addedZIndex || 0 );
			}
 		}
		


		

	}

	remove( sprite, type ){

		for( var s in sprite.derivates ){
			sprite.derivates[s].sprite.destroy({children:true});
			if( sprite.derivates[s].type ) type = sprite.derivates[s].type;
		}
		sprite.destroy({children:true});
		
		if( this[type] ){
			this[type].visible = true;
			this[type+'Sprite'].visible = false;
			this.renderTexture(type);
		}
		
		
		
		
	}


	renderTexture(type, delay = true){

		return;

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

/*get tint(){ return this._tint || 0xffffff; };
	set tint(tint){
		this._tint = tint;
		this.children.forEach( (child) => {
			child.tint = tint;
		})

	}*/