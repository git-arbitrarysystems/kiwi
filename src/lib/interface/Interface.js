
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

				// GET OBJECT INFO
				let url = Textures[group][image].url,
					id = group+'/'+image,
					size = Textures[group][image].size,
					title = id + ' ' + size,
					modulo = Textures[group][image].modulo ? 1 : 0;
				
				// CREATE TEXTURE BUTTON
				var b = this.ce({target:c, class:'button', 
					id:id, 
					title:title,
					'data-url':url,
					'data-size':size,
					'data-modulo':modulo

				});
				b.addEventListener('click', (e)=>{ this.selected(e); console.log('Interface.selected:', this.selected() ); })

				var i = this.ce({target:b, tag:'img', src:url});
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

		// DESELECT && FALL BACK TO DEFAUT MODE
		if( !e ){
			this.mode( this.gridModes[0] );
			this.___selected = false;
			return;
		}

		// SELECT NEW
		this.___selected = {
			element:e.currentTarget,
			id:e.currentTarget.id,
			url:e.currentTarget.getAttribute('data-url'),
			size:e.currentTarget.getAttribute('data-size').split(','),
			modulo:e.currentTarget.getAttribute('data-modulo') === '1' ? true : false
		}

		// NORMALIZE SIZE
		this.___selected.size.forEach( (v,i,a)=>{ a[i] = parseInt(v,10); });

		App.Grid.stamp.update(this.___selected);

		// STORE INTERFACE MODE
		this.mode( this.___selected.id.split('/')[0] )

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