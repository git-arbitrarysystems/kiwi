import {H} from 'interface/H';
import './DataSheet.scss';
import {Transform} from 'grid/Transform'
import {App} from 'App'


class DataSheetNode{
	constructor(target){
		this.root = H.ce({class:'node', target:target});
		this.img = H.ce({tag:'img', target:this.root});
		this.p = H.ce({tag:'p', innerHTML:'info', target:this.root});
	}
	feed(content){
		console.log('DataSheetNode.feed', content);
		this.p.innerHTML = content.id;
	}
	destroy(){
		this.root.remove();
	}
}


class DataSheet{
	constructor(){
		this.root = H.ce({class:'datasheet'});
		
		// TITLE
		H.ce({target:this.root, class:'title', innerHTML:'datasheet', tag:'h2'});


		let dataHolderParent = H.ce({class:'menu', target:this.root})

		this.content = H.ce({class:'content', target:dataHolderParent});

		let btn_prev = H.ce({target:dataHolderParent, class:'button', innerHTML:'<', tag:'button'});
			btn_prev.addEventListener('click', (e) => { this.prev() });
		let info = H.ce({class:'info', target:dataHolderParent})
		let btn_next = H.ce({target:dataHolderParent, class:'button', innerHTML:'>', tag:'button'});
			btn_next.addEventListener('click', (e) => { this.next() });

		this.n =  H.ce({target:info, innerHTML:'0', tag:'span'});
		this.c =  H.ce({target:info, innerHTML:'0', tag:'span'})

		this.nodes = [];

	}

	get tile(){ return this._tile }
	set tile(tile){
		if( tile !== this._tile ){
			this._tile = tile;
			if( tile ){
				console.log('DataSheet.showTileData', tile.toString(), tile.content.keys );

				// POSITION
				var p = Transform.c2p(tile.cx, tile.cy);
				p.x += App.Grid.x;
				p.y += App.Grid.y;
				console.log(p);

				this.root.style.left = p.x + 'px';
				this.root.style.top  = p.y + 'px';

				// CONTENT
				let nodes = tile.content.getDataNodes()
				nodes.forEach( (node, index, array) => {
					if( !this.nodes[index] ) this.nodes[index] = new DataSheetNode(this.content);
					this.nodes[index].feed(node);
				});

				this.updateDisplay(0, nodes.length);



			}else{
				console.log('DataSheet.hideTileData');
			}
		}
	}

	updateDisplay(count = this.count, length = this.length){

		this.count = count;
		this.length = length;

		for(var i=this.nodes.length-1; i>=length;i--){
			this.nodes.splice(i,1)[0].destroy();
		}

		this.n.innerHTML = count+1;
		this.c.innerHTML = length;

		this.nodes.forEach( (node,index) => {
			node.root.style.left = ((index-count)*100) + '%';
		});
	}

	next(){
		this.count = (this.count+1) % this.length;
		this.updateDisplay()
	}

	prev(){
		this.count = (this.count-1+this.length) % this.length;
		this.updateDisplay()
	}
	

}


export {DataSheet, DataSheetNode}


import {HotModule} from 'HotModule'
HotModule(module, DataSheet, Node);