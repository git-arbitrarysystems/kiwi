import {H} from 'interface/H';
import './KiwiActionPanel.scss';
import {Transform} from 'grid/Transform'
import {App} from 'App'
import {TextureData} from 'interface/Interface';

export class KiwiActionPanel{
	constructor(){
		this.root = H.ce({class:'action-panel hidden'});


		// TITLE
		this.title = H.ce({target:this.root, class:'title', innerHTML:'Kiwi Action Panel', tag:'h2'});

		this.btn_close = H.ce({target:this.root, class:'button', innerHTML:'X', tag:'button'});
		this.btn_close.addEventListener('click', (e) => { this.kiwi = false; });


		this.btn_moveRand = H.ce({target:this.root, innerHTML:'move-rand', tag:'button'});
		this.btn_moveRand.addEventListener('click', (e) => { this.kiwi.move('rand'); });

	}

	get kiwi(){ return this._kiwi };
	set kiwi(kiwi){

		if( this.kiwi ) this.kiwi.selected = false;
		if( kiwi !== this._kiwi ){

			this._kiwi = kiwi;
			if( !kiwi ){
				this.root.classList.add('hidden');
			}else{
				this.root.classList.remove('hidden');
				this.updateData();
			}
		}
	}

	updateData(){

		console.log(this.kiwi);

		this.kiwi.selected = true;
		this.title.innerHTML = this.kiwi.toString();

	}

}


import {HotModule} from 'HotModule'
HotModule(module, KiwiActionPanel);