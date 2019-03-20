import * as PIXI from 'pixi.js';
import {App} from 'App';
import {Generic} from 'grid/types/Generic'
import {Transform} from 'grid/Transform';
import {Texture} from 'grid/Texture';

export class Build extends Generic{
	
	constructor(sprite){
		super(sprite)

		this.on('update-transform', (e) => {

			this.updateDerivates();

			Transform.transform( this.sprite, this.textureData.size, this.textureData.skewX, this.textureData.skewY);
			this.sprite.anchor.set(0.5, 1 );

		});

		this.on('update-position', (e) => {
			this.updateDerivates();
		});

	}

	enable(){
		console.log('Build.enable');
		if( !this.surface ) this.surface = new PIXI.Sprite();
		if( this.sprite.parent ){
			this.sprite.parent.addChildAt( this.surface, this.sprite.parent.getChildIndex(this.sprite) );
		}
		
	}

	disable(){
		console.log('Build.disable');
	}

	destroy(){
		console.log('Build.destroy');
	}


	

	updateDerivates(){

		if( this.textureData.images.surface && this.surface ){
			
			// CREATE
			var texture = Texture(this.textureData, 'surface');
			if( this.surface.texture !== texture ){
				this.surface.texture = texture;
				if( !texture.valid ){
					texture.on('update', (e) => {
						this.transformSurface();
					});
				}else{
					this.transformSurface();
				}
			}

			this.surface.x = this.sprite.x;
			this.surface.y = this.sprite.y;


			// REGISTER
			this.addDerivate('surface', {sprite:this.surface,type:'surface',addedZIndex:100000})

		}else{
			// DESTROY
			this.destroyDerivates();
		}

		

	}

	transformSurface(){
		if( this.surface ){
			Transform.transform( this.surface, this.textureData.size, this.textureData.skewX, this.textureData.skewY);
			this.surface.anchor.set(0.5, 1 );
		}
	}


	
}



import {HotModule} from 'HotModule.js'
HotModule(module, Build );