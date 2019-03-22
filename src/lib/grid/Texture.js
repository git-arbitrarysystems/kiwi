import * as PIXI from 'pixi.js';

export function Texture(textureData, id = 'main', rotate = 0){

	var texture = new PIXI.Texture.from( textureData.images[id].url );
	texture.rotate = rotate;

	// ORIGINAL SIZE
	texture.orig = new PIXI.Rectangle( 0, 0, textureData.orig.width, textureData.orig.height );

	// TRIMMED AREA
	texture.trim = new PIXI.Rectangle( textureData.images[id].trim.left, textureData.images[id].trim.top, textureData.images[id].trim.width, textureData.images[id].trim.height );
	
	// UPDATE TEXTURE
	texture.updateUvs();

	return texture;

}