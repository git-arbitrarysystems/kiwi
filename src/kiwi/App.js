import {debounce} from 'lodash';
import * as PIXI from 'pixi.js';
import {ResizeHandler} from 'ResizeHandler';
import {Grid} from 'Grid';

export class App extends PIXI.Application{
	constructor(settings){
		super(settings);

		// ADD TO HTML
		document.body.appendChild( this.view );

		// BACKGROUND
		this.background = this.stage.addChild( new PIXI.Sprite(PIXI.Texture.WHITE) );
		this.background.tint = 0x123456;

		// MAIN GRID
		this.grid = this.stage.addChild( new Grid() );

		// SETUP RESIZE-HANDLER
		ResizeHandler.source = this.screen;
		ResizeHandler.add( (dimensions)=>{
			this.background.width = dimensions.width;
			this.background.height = dimensions.height;

			this.grid.x = dimensions.width * 0.5;
			this.grid.y = dimensions.height * 0.51;

		});

		// TRIGGER INITIAL RESIZE
		ResizeHandler.trigger();


	}
	
};

