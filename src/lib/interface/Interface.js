
import {Textures} from '../../assets/img/textures/Textures.js';
import {App} from 'App';
import './Interface.scss';

export class Interface{
	constructor(){

		App.register(this);

		// INTERFACE		
		this.root = this.ce({class:'interface'});
		this.root.addEventListener('click', (e)=>{this.deselect(); } );

		// GRID-INTERACTION-MODES
		this.gridModesSelector = this.ce({target:this.root, tag:'select', disabled:true});
		this.gridModes = ['drag','road','surface','build'];
		this.gridModes.forEach( (value)=>{ this.ce({target:this.gridModesSelector, value:value, innerHTML:value,tag:'option'}); })

		// TEXTURES
		for( var group in Textures ){

			// CREATE TEXTURE GROUP
			var g = this.ce({class:'group', target:this.root});
			var t = this.ce({tag:'h2', target:g, innerHTML:group});
			var c = this.ce({class:'content', target:g});

			for( var image in Textures[group] ){
				
				// CREATE TEXTURE BUTTON
				var b = this.ce({target:c, class:'button', id:group+'/'+image, title:group+'/'+image, url:Textures[group][image]});
				b.addEventListener('click', (e)=>{ this.selected(e); console.log('Interface.selected:', this.selected() ); })

				var i = this.ce({target:b, tag:'img', src:Textures[group][image]});
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

		if( e !== undefined ){
			
			if( this.___selected && this.___selected !== e.currentTarget ) this.___selected.classList.remove('selected');
			
			if( e.currentTarget ){
				e.currentTarget.classList.add('selected');
				this.___selected = e.currentTarget;
				e.stopImmediatePropagation();
			}else{
				this.___selected = false;
			}

			let id = this.___selected ? this.___selected.id : false,
				mode = id ? id.split('/')[0] : this.gridModes[0];
				this.mode(mode);
		}
		return this.___selected ? {id:this.___selected.id, url:this.___selected.getAttribute('url') } : false;
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