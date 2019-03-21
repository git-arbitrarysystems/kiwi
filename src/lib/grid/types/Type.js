import {Generic} from 'grid/types/Generic';
import {Surface} from 'grid/types/Surface';
import {Road} from 'grid/types/Road';
import {Fence} from 'grid/types/Fence';
import {Build} from 'grid/types/Build';


const types = {
	surface:Surface,
	road:Road,
	fence:Fence,
	build:Build
}

Generic.mixin = function(type, sprite, textureDataId){

	if( !sprite[type] && types[type] ){
		sprite[type] = new types[type](sprite);
		//console.log('Generic.mixin', type, sprite, '>>>', sprite[type]);
	}

	for( var s in types ){
		if( sprite[s] ){
			sprite[s].enabled = (s===type);
			if( sprite[s].enabled ){
				sprite[s].textureDataId = textureDataId;
			}
		} 
	}

}


Generic.destroy = function(sprite){
	for( var s in types ){
		if( sprite[s] ){
			sprite[s].enabled = false;
		} 
	}
	sprite.destroy({children:true})			
}


export {Generic, Surface, Road, Fence, Build};