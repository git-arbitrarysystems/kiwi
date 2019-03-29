import {Generic} from 'grid/types/Generic';
import {Surface} from 'grid/types/Surface';
import {Road} from 'grid/types/Road';
import {Fence} from 'grid/types/Fence';
import {Build} from 'grid/types/Build';
import {Kiwi} from 'grid/types/Kiwi';


const types = {
	surface:Surface,
	road:Road,
	fence:Fence,
	build:Build,
	kiwi:Kiwi
}


Generic.create = function(type, textureDataId, selection, index = 0){

	var sprite;

	//console.log('Generic.create', type, '(',textureDataId, selection, index,')');

	if( types[type] ){
		sprite = new types[type]();
	}else{
		sprite = new Generic();
	}

	sprite.on('added', ()=>{
		sprite.enabled = true;
		sprite.textureDataId = textureDataId;
		sprite.selection = selection;
		sprite.index = index;
		sprite.off('added');
	})

	
	
	return sprite;

}


Generic.destroy = function(sprite){
	sprite.enabled = false;
	sprite.destroy({children:true})			
}


export {Generic, Surface, Road, Fence, Build, Kiwi};