import {debounce} from 'lodash';
import * as PIXI from 'pixi.js';
import {ResizeHandler} from 'static/ResizeHandler';
import {Grid} from 'grid/Grid';
import {Interface} from 'interface/Interface';

import './App.scss';
import '../assets/fonts/fonts.scss';


export class App extends PIXI.Application{
	constructor(settings){
		super(settings);

		// REGISTER SELF
		App.App = this;

		// ADD TO HTML
		document.body.appendChild( this.view );

		// INTERFACE
		this.interface = new Interface();

		// MAIN GRID
		this.grid = this.stage.addChild( new Grid() );
		

		// SETUP RESIZE-HANDLER
		ResizeHandler.source = this.screen;
		ResizeHandler.add( (dimensions)=>{
			this.grid.screen = this.screen;
		});

		// TRIGGER INITIAL RESIZE
		ResizeHandler.trigger();

	}

	static register(instance){
		let name = instance.constructor.name;
		if( App[name] ){
			throw new Error('App.' + name + ' is already registered.')
			return;
		}
		App[name] = instance;
		console.log('App.register', name, instance);
	}

	
};


window.App = App;

