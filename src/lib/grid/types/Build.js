import * as PIXI from 'pixi.js';
import {App} from 'App';
import {Generic} from 'grid/types/Generic'
import {Transform} from 'grid/Transform';
import {Texture} from 'grid/Texture';

export class Build extends Generic{
	
	constructor(texture){
		super(texture)

		//this.on('enable', ()=>{});
		//this.on('disable', ()=>{});

		this.on('update', ()=>{

			// TRANSFORM SELF
			Transform.transform( this, this.textureData.size, this.textureData.skewX, this.textureData.skewY);
			this.anchor.set(0.5, 1 );

			if( this.textureData.images.surface ){
				
				this.addDerivate('surface');
				
				this.parent.addChildAt( this.derivates.surface, this.parent.getChildIndex(this) );
				this.derivates.surface.type = 'surface';
				this.derivates.surface.addedZIndex = 1000000;
				this.derivates.surface.texture = Texture(this.textureData, 'surface' );

				// TRANSFORM SURFACE
				Transform.transform( this.derivates.surface, this.textureData.size, this.textureData.skewX, this.textureData.skewY);
				this.derivates.surface.anchor.set( 0.5, 1 );
			
			}else{
				this.destroyDerivate('surface');
			}



		});

		this.on('update-position', ()=>{
			this.x = this.limits.x;
			this.y = this.limits.bottom;
			if( this.derivates.surface ){
				this.derivates.surface.x = this.x;
				this.derivates.surface.y = this.y;
			}

		});

	}
	
}



import {HotModule} from 'HotModule.js'
HotModule(module, Build );