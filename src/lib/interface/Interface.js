

import {App} from 'App';
import './Interface.scss';

import {Textures,GhostTile} from '../../assets/img/textures/Textures.js';
const TextureData = {};

import {Images} from 'Images';


class Interface{
	constructor(){

		App.register(this);

		// INTERFACE		
		this.root = this.ce({class:'interface'});
		this.root.addEventListener('click', (e)=>{this.deselect(); } );

		// GRID-INTERACTION-MODES
		this.stampModes = ['road','surface','build', 'fence'];
		this.gridModes = ['drag'].concat(this.stampModes).concat(['destroy-road','destroy-surface','destroy-build', 'destroy-fence']);

		this.gridModesSelector = this.ce({target:this.root, tag:'select', disabled:true});
		this.gridModes.forEach( (value)=>{ this.ce({target:this.gridModesSelector, value:value, innerHTML:value,tag:'option'}); })


		// SCALE
		this.scales = [0.25, 0.33, 0.5, 0.75, 1, 1.25, 1.5, 2, 3 ];
		this.scalesSelector = this.ce({target:this.root, tag:'select'});
		this.scalesSelector.addEventListener('change', (e) => {
			App.Grid.updateScale( parseFloat(this.scalesSelector.value, 10) );
		})
		this.scales.forEach( (value)=>{ this.ce({target:this.scalesSelector, value:value, innerHTML:value,tag:'option',selected:(value===1)}); })

		// TEMP STORE
		this.store = this.ce({target:this.root, tag:'button', innerHTML:'store'});
		this.store.addEventListener('click', (e) => {
			App.Grid.data.store();
		})

		// TOGGLE GRID
		this.tg = this.ce({target:this.root, tag:'button', innerHTML:'toggle-grid'});
		this.tg.addEventListener('click', (e) => {
			App.Grid.container.visible = !App.Grid.container.visible;
		})


		// TEXTURES
		for( var group in Textures ){

			// CREATE TEXTURE GROUP
			var g = this.ce({class:'group', target:this.root});
			var t = this.ce({tag:'h2', target:g, innerHTML:group});
			var c = this.ce({class:'content', target:g});

			for( var image in Textures[group] ){

				// GET OBJECT INFO
				let url = Textures[group][image].images.main.url,
					id = group+'/'+image,
					title = id;

				// STORE ARBITRARY DATA
				TextureData[id] = Textures[group][image];
				TextureData[id].id = id;
				
				// CREATE TEXTURE BUTTON
				var b = this.ce({target:c, class:'button', 
					id:id, 
					title:title
				});

				b.style.backgroundImage = 'url('+url+')'
				b.addEventListener('click', (e)=>{ this.selected(e);})

			
			}

			// DESTROY
			var d = this.ce({target:c, class:'button', 
				id:'destroy-' + group, 
				title:'detroy ' + group
			});
			d.style.backgroundImage = 'url('+Images.destroy+')'
			d.addEventListener('click', (e)=>{ this.selected(e);})



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

		if( this.___selected && this.___selected.element ){
			this.___selected.element.classList.remove('selected');	
		}

		// STORE INTERFACE MODE
		if( e ){
			this.mode( e.currentTarget.id.split('/')[0] )
			e.currentTarget.classList.add('selected');
			e.stopImmediatePropagation();
		}else{
			this.mode( this.gridModes[0] );
		}
		

		// DESELECT && FALL BACK TO DEFAUT MODE
		if( this.stampModes.indexOf( this.mode() ) === -1 ){
			this.___selected = {element:e.currentTarget};
			App.Grid.updateStamp(false);
			return;
		}


		// SELECT NEW
		this.___selected = Object.assign({
			element:e.currentTarget,
			id:e.currentTarget.id,
			size:[1,1]
		}, TextureData[e.currentTarget.id] );


		// PROPAGATE TO STAMP TOOL
		App.Grid.updateStamp( this.___selected );


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

export {Interface, TextureData, GhostTile, Images};