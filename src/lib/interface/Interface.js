

import {App} from 'App';
import './Interface.scss';

import {Textures} from '../../assets/img/textures/Textures.js';
const TextureData = {};


class Interface{
	constructor(){

		App.register(this);

		// INTERFACE		
		this.root = this.ce({class:'interface'});
		this.root.addEventListener('click', (e)=>{this.deselect(); } );

		// GRID-INTERACTION-MODES
		this.gridModesSelector = this.ce({target:this.root, tag:'select', disabled:true});
		this.gridModes = ['drag','road','surface','build','destroy-road', 'destroy-build'];
		this.gridModes.forEach( (value)=>{ this.ce({target:this.gridModesSelector, value:value, innerHTML:value,tag:'option'}); })

		// TEXTURES
		for( var group in Textures ){

			// CREATE TEXTURE GROUP
			var g = this.ce({class:'group', target:this.root});
			var t = this.ce({tag:'h2', target:g, innerHTML:group});
			var c = this.ce({class:'content', target:g});

			for( var image in Textures[group] ){

				// GET OBJECT INFO
				let url = Textures[group][image].url,
					id = group+'/'+image,
					title = id;

				// STORE ARBITRARY DATA
				TextureData[id] = Textures[group][image];
				
				// CREATE TEXTURE BUTTON
				var b = this.ce({target:c, class:'button', 
					id:id, 
					title:title
				});

				b.style.backgroundImage = 'url('+url+')'
				b.addEventListener('click', (e)=>{ this.selected(e); console.log('Interface.selected:', this.selected() ); })

			
			}


			if( group !== 'surface' ){
				// DESTROY
				var d = this.ce({target:c, class:'button', 
					id:'destroy-' + group, 
					innerHTML:'destroy ' + group,
					tag:'button'
				});
				d.addEventListener('click', (e)=>{ this.selected(e); console.log('Interface.selected:', this.selected() ); })
			}
			

		}
	}

	// CREATE ELEMENT
	ce(props = {}){
		var d = document.createElement( props.tag || 'div' );
		for( var s in props ){
			if( ['target','tag'].indexOf(s) !== 0 ){
				if( typeof d[s] !== 'undefined' ){
					d[s] = props[s]
				}else{
					d.setAttribute(s, props[s] );
				}
			}
		}
		(props.target ? props.target : document.body ).appendChild(d);
		return d;
	}

	// SELECT TEXTURE
	selected(e){

		// GETTER
		if( e === undefined ){
			return this.___selected;
		}

		if( this.___selected ){
			this.___selected.element.classList.remove('selected');	
		}

		// STORE INTERFACE MODE
		this.mode( e ? e.currentTarget.id.split('/')[0] : this.gridModes[0] );
	

		// DESELECT && FALL BACK TO DEFAUT MODE
		if( ['path','destroy-road', 'destroy-build'].indexOf( this.mode() ) !== -1 ){
			this.___selected = false;
			App.Grid.stamp.textureData = false;
			return;
		}


		// SELECT NEW
		this.___selected = Object.assign({
			element:e.currentTarget,
			id:e.currentTarget.id,
			size:[1,1]
		}, TextureData[e.currentTarget.id] );


		// PROPAGATE TO STAMP TOOL
		App.Grid.stamp.textureData = this.___selected;


		// 
		e.currentTarget.classList.add('selected');
		e.stopImmediatePropagation();


		return this.___selected;
	}
	deselect(){
		if( this.___selected ){
			console.log('Interface.deselect');
			this.selected(false);
		}
	}

	// GRIDMODE
	mode(mode){
		if( typeof mode === 'string' && this.gridModesSelector.value !== mode ){
			console.log('Interface.mode:', mode);
			this.gridModesSelector.value = mode;
			
		}else{
			return this.gridModesSelector.value;
		}
		
	}


}

import {HotModule} from '../../../HotModule.js'
HotModule(module, Interface);

export {Interface, TextureData};